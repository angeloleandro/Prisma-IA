import { NextResponse } from "next/server"
import stripe from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
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

    console.log("Authenticated user:", user.id)

    // Verificar se o usuário já é pro
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_pro")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("Error fetching profile:", profileError)
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 500 }
      )
    }

    if (profile && profile.is_pro) {
      return NextResponse.json(
        { error: "User is already a Pro member" },
        { status: 400 }
      )
    }

    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID

    if (!priceId) {
      throw new Error("NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID is not set")
    }

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
      success_url: `${baseUrl}/upgrade/success`,
      cancel_url: `${baseUrl}/upgrade/failed`,
      client_reference_id: user.id,
      customer_email: user.email
    })

    console.log("Stripe session created:", session.id)

    return NextResponse.json({ sessionUrl: session.url })
  } catch (error) {
    console.error(
      "Error creating Stripe session:",
      error instanceof Error ? error.message : String(error)
    )
    return NextResponse.json(
      { error: "Error creating Stripe session" },
      { status: 500 }
    )
  }
}
