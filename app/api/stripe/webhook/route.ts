import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import Stripe from "stripe"

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

        // Verificar se o usuário já é pro
        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.client_reference_id)
          .single()

        console.log("Supabase query result:", { userData, userError })

        if (userError) {
          console.error("Error fetching user data:", userError)
          return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
          )
        }

        if (!userData) {
          console.error("No user found with id:", session.client_reference_id)
          return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        console.log("User data before update:", userData)

        if (userData.is_pro) {
          console.log("User is already Pro, skipping update")
          return NextResponse.json({ message: "User is already Pro" })
        }

        console.log("Attempting to update user to Pro")
        const { data: updateData, error: updateError } = await supabase
          .from("profiles")
          .update({ is_pro: true })
          .eq("id", session.client_reference_id)
          .select()

        console.log("Update result:", { updateData, updateError })

        if (updateError) {
          console.error("Error updating user to Pro:", updateError)
          return NextResponse.json(
            { error: "Failed to update user to Pro" },
            { status: 500 }
          )
        }

        console.log("User successfully updated to Pro")
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
