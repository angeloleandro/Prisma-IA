import { NextResponse } from "next/server"
import stripe from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("Error fetching user:", userError)
      return NextResponse.json(
        { error: "Failed to authenticate user" },
        { status: 401 }
      )
    }

    if (user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID

    if (!priceId) {
      throw new Error("NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID is not set")
    }

    console.log("Using price ID:", priceId)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: "subscription",
      success_url: `${baseUrl}/upgrade?success=true`,
      cancel_url: `${baseUrl}/upgrade?canceled=true`,
      client_reference_id: userId,
      customer_email: user.email
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating Stripe session:", error)
    return NextResponse.json(
      { error: "Error creating Stripe session" },
      { status: 500 }
    )
  }
}
