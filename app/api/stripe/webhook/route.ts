import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import Stripe from "stripe"
import {
  getProfileByUserId,
  createProfileIfNotExists,
  upgradeToProStatus
} from "@/db/profile"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20"
})

export async function POST(req: Request) {
  console.log("Webhook received")

  try {
    const body = await req.text()
    console.log("Request body:", body)

    const signature = req.headers.get("stripe-signature")

    if (!signature) {
      console.error("No Stripe signature found")
      return NextResponse.json(
        { error: "No Stripe signature" },
        { status: 400 }
      )
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log("Event type:", event.type)

    if (event.type === "checkout.session.completed") {
      console.log("Processing checkout.session.completed")
      const session = event.data.object as Stripe.Checkout.Session
      console.log("Session data:", session)

      if (session.client_reference_id) {
        console.log(
          "Received client_reference_id:",
          session.client_reference_id
        )

        const supabase = createClient(cookies())

        try {
          let profile = await getProfileByUserId(session.client_reference_id)

          if (!profile) {
            console.log("No profile found, creating new profile")
            profile = await createProfileIfNotExists(
              session.client_reference_id
            )
          }

          console.log("Profile before update:", profile)

          if (profile.is_pro) {
            console.log("User is already Pro, skipping update")
            return NextResponse.json({ message: "User is already Pro" })
          }

          console.log("Attempting to upgrade user to Pro")
          const updatedProfile = await upgradeToProStatus(
            session.client_reference_id
          )

          console.log("User successfully upgraded to Pro:", updatedProfile)

          return NextResponse.json({
            message: "User upgraded to Pro successfully"
          })
        } catch (error) {
          console.error("Error processing pro upgrade:", error)
          return NextResponse.json(
            { error: "Failed to process pro upgrade" },
            { status: 500 }
          )
        }
      } else {
        console.error("No client_reference_id found in session")
        return NextResponse.json(
          { error: "No client_reference_id found" },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    )
  }
}
