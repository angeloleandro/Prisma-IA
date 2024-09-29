import { NextResponse } from "next/server"
import stripe from "@/lib/stripe"
import { updateProfile } from "@/db/profile"

export const config = {
  api: {
    bodyParser: false
  }
}

export const runtime = "nodejs"

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

  console.log("Received event:", event.type)

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as any
      console.log("Checkout session completed:", session)
      if (session.client_reference_id) {
        try {
          const updatedProfile = await updateProfile(
            session.client_reference_id,
            { is_pro: true }
          )
          console.log("User updated to Pro:", updatedProfile)
        } catch (error) {
          console.error("Error updating user to Pro:", error)
          // Aqui você pode adicionar uma lógica para lidar com falhas na atualização
          // Por exemplo, você pode querer registrar isso em um sistema de monitoramento
          // ou tentar novamente mais tarde
        }
      } else {
        console.error("No client_reference_id found in session")
        // Aqui você pode querer registrar este erro de alguma forma
        // já que isso não deveria acontecer em condições normais
      }
      break

    case "customer.subscription.deleted":
      const subscription = event.data.object as any
      if (subscription.client_reference_id) {
        try {
          const updatedProfile = await updateProfile(
            subscription.client_reference_id,
            { is_pro: false }
          )
          console.log("User downgraded from Pro:", updatedProfile)
        } catch (error) {
          console.error("Error downgrading user from Pro:", error)
        }
      } else {
        console.error("No client_reference_id found in subscription")
      }
      break

    // Adicione outros casos conforme necessário
  }

  return NextResponse.json({ received: true })
}
