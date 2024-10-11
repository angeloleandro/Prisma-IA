// app/api/webhooks/route.ts

import Stripe from "stripe";
import { stripe } from "@/utils/stripe/server"; // Certifique-se de que 'stripe' está exportado corretamente
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
  deleteProductRecord,
  deletePriceRecord,
} from "@/utils/supabase/admin";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: "Webhook secret not found." }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;
        case "price.created":
        case "price.updated":
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;
        case "price.deleted":
          await deletePriceRecord(event.data.object as Stripe.Price);
          break;
        case "product.deleted":
          await deleteProductRecord(event.data.object as Stripe.Product);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string
            // Removido 'event.type' para corresponder à definição da função
          );
          break;
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string
              // Removido 'event.type' para corresponder à definição da função
            );
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log("Webhook handler failed:", error);
      return NextResponse.json(
        { error: "Webhook handler failed. Check the server logs for more details." },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ error: `Unhandled event type: ${event.type}` }, { status: 400 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// Assegure-se de que o runtime seja 'nodejs'
export const runtime = "nodejs";
