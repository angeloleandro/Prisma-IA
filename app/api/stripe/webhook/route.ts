import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20"
})
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { userId, priceId } = await req.json()

    // Criar ou recuperar o cliente Stripe
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { userId }
      })
      customerId = customer.id

      // Atualizar o perfil com o ID do cliente Stripe
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId)
    }

    // Criar a assinatura
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      metadata: { userId }
    })

    // Atualizar a tabela de assinaturas no Supabase
    await supabase.from("subscriptions").upsert({
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      plan_id: priceId,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000)
    })

    let clientSecret: string | null | undefined
    const latestInvoice = subscription.latest_invoice as Stripe.Invoice
    if (
      latestInvoice &&
      latestInvoice.payment_intent &&
      typeof latestInvoice.payment_intent !== "string"
    ) {
      clientSecret = latestInvoice.payment_intent.client_secret
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: clientSecret || undefined
    })
  } catch (error) {
    console.error("Error creating subscription:", error)
    return NextResponse.json(
      { error: "Error creating subscription" },
      { status: 500 }
    )
  }
}
