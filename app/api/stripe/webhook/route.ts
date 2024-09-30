import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getProfileByUserId, createProfileIfNotExists } from "@/db/profile"
import { upgradeToProStatus } from "@/db/profile-server"

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

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err: unknown) {
      console.error(
        `Webhook signature verification failed: ${err instanceof Error ? err.message : String(err)}`
      )
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("Event type:", event.type)

    if (event.type === "checkout.session.completed") {
      console.log("Processing checkout.session.completed")
      const session = event.data.object as Stripe.Checkout.Session
      console.log("Session data:", JSON.stringify(session, null, 2))

      if (session.client_reference_id) {
        console.log(
          "Received client_reference_id:",
          session.client_reference_id
        )

        try {
          let profile = await getProfileByUserId(session.client_reference_id)
          console.log("Retrieved profile:", JSON.stringify(profile, null, 2))

          if (!profile) {
            console.log("No profile found, creating new profile")
            profile = await createProfileIfNotExists(
              session.client_reference_id
            )
            console.log(
              "Created new profile:",
              JSON.stringify(profile, null, 2)
            )
          }

          if (profile.is_pro) {
            console.log("User is already Pro, skipping update")
            return NextResponse.json({ message: "User is already Pro" })
          }

          console.log("Attempting to upgrade user to Pro")
          const updatedProfile = await upgradeToProStatus(
            session.client_reference_id
          )

          console.log(
            "User successfully upgraded to Pro:",
            JSON.stringify(updatedProfile, null, 2)
          )

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
    } else {
      console.log("Unhandled event type:", event.type)
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
