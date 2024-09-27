import { NextResponse } from "next/server"
import stripe from "@/lib/stripe"
import { updateProfile } from "@/db/profile"

export const runtime = "edge"

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("Error verifying webhook signature:", err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as any
      console.log("Checkout session completed:", session)
      // Atualizar o status do usuário para Pro
      try {
        await updateProfile(session.client_reference_id, { is_pro: true })
        console.log("User updated to Pro:", session.client_reference_id)
      } catch (error) {
        console.error("Error updating user to Pro:", error)
      }
      break
    case "customer.subscription.deleted":
      const subscription = event.data.object as any
      console.log("Subscription deleted:", subscription)
      // Implementar lógica para remover o status Pro do usuário
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
