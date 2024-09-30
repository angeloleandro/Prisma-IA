import { NextResponse } from "next/server"
import stripe from "@/lib/stripe"

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    console.log("Creating Stripe session for user:", userId)

    // Usar o URL base da aplicação
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://prisma-ia.vercel.app"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID,
          quantity: 1
        }
      ],
      mode: "subscription",
      success_url: `${baseUrl}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/upgrade?canceled=true`,
      client_reference_id: userId
    })

    console.log("Stripe session created:", session.id)
    return NextResponse.json({ sessionId: session.id })
  } catch (error: unknown) {
    console.error("Error creating Stripe session:", error)
    return NextResponse.json(
      {
        error:
          "Error creating Stripe session: " +
          (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    )
  }
}
