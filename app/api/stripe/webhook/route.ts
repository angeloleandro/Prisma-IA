import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { upsertProductRecord, upsertPriceRecord, manageSubscriptionStatusChange, deleteProductRecord, deletePriceRecord } from '@/utils/supabase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define os eventos relevantes que o webhook vai lidar
const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'product.deleted',
  'price.created',
  'price.updated',
  'price.deleted',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    // Verificação da assinatura do webhook
    if (!sig || !webhookSecret) {
      return new NextResponse('Webhook secret not found.', { status: 400 });
    }

    // Verifica a assinatura do webhook para garantir que é autêntico
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔 Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Verifica se o evento recebido é um dos eventos que estamos interessados
  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          // Atualiza ou cria o registro do produto no Supabase
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;
        case 'price.created':
        case 'price.updated':
          // Atualiza ou cria o registro do preço no Supabase
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;
        case 'price.deleted':
          // Deleta o registro do preço no Supabase
          await deletePriceRecord(event.data.object as Stripe.Price);
          break;
        case 'product.deleted':
          // Deleta o registro do produto no Supabase
          await deleteProductRecord(event.data.object as Stripe.Product);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          // Gerencia as mudanças no status da assinatura do cliente
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === 'customer.subscription.created'
          );
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true
            );
          }
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.error(`Erro ao processar o webhook: ${error}`);
      return new NextResponse('Webhook handler failed.', { status: 400 });
    }
  } else {
    console.log(`Evento não suportado: ${event.type}`);
    return new NextResponse(`Unsupported event type: ${event.type}`, { status: 400 });
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}