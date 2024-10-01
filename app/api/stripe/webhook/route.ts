import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20"
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  switch (event.type) {
    case "customer.subscription.created":
      // Handle successful subscription
      break
    case "customer.subscription.deleted":
      // Handle subscription cancellation
      break
    // Add other event types as needed
  }

  return NextResponse.json({ received: true })
}
