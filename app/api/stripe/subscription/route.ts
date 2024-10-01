import { NextResponse } from "next/server"
import getStripe from "@/lib/stripe"

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    const stripe = getStripe()

    if (!stripe) {
      throw new Error("Failed to initialize Stripe")
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID,
          quantity: 1
        }
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/upgrade?success=true`,
      cancel_url: `${req.headers.get("origin")}/upgrade?canceled=true`,
      metadata: {
        userId
      }
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error("Erro ao criar sessão do Stripe:", err)
    return NextResponse.json(
      { error: "Erro ao criar sessão do Stripe" },
      { status: 500 }
    )
  }
}
