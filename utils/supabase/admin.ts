// utils/supabase/admin.ts

import { toDateTime } from '@/utils/helpers';
import { stripe } from '@/utils/stripe/config';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import type { Database, Tables, TablesInsert } from "@/supabase/types";

type Product = Tables<'products'>;
type Price = Tables<'prices'>;

const TRIAL_PERIOD_DAYS = 0;

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Função para criar ou recuperar um cliente no Stripe
export const createOrRetrieveCustomer = async ({
  uuid,
  email
}: {
  uuid: string;
  email: string;
}) => {
  const { data: existingSupabaseCustomer, error: queryError } =
    await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('id', uuid)
      .maybeSingle();

  if (queryError) {
    throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
  }

  let stripeCustomerId: string | undefined;
  if (existingSupabaseCustomer?.stripe_customer_id) {
    stripeCustomerId = existingSupabaseCustomer.stripe_customer_id;
  } else {
    const stripeCustomers = await stripe.customers.list({ email: email });
    stripeCustomerId =
      stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;
  }

  const stripeIdToInsert = stripeCustomerId
    ? stripeCustomerId
    : await stripe.customers.create({ email }).then(c => c.id);

  if (!stripeIdToInsert) throw new Error('Stripe customer creation failed.');

  if (!existingSupabaseCustomer) {
    await supabaseAdmin
      .from('customers')
      .insert([{ id: uuid, stripe_customer_id: stripeIdToInsert }]);
  }

  return stripeIdToInsert;
};

// Função para gerenciar mudanças de status da assinatura
export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string
) => {
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (noCustomerError)
    throw new Error(`Customer lookup failed: ${noCustomerError.message}`);

  const { id: uuid } = customerData!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });

  const quantity = subscription.items?.data[0]?.quantity ?? 1;

  const subscriptionData: TablesInsert<'subscriptions'> = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    quantity: quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? toDateTime(subscription.cancel_at).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    current_period_start: toDateTime(subscription.current_period_start).toISOString(),
    current_period_end: toDateTime(subscription.current_period_end).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at
      ? toDateTime(subscription.ended_at).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? toDateTime(subscription.trial_end).toISOString()
      : null
  };

  const { error: upsertError } = await supabaseAdmin
    .from('subscriptions')
    .upsert([subscriptionData]);

  if (upsertError)
    throw new Error(`Subscription insert/update failed: ${upsertError.message}`);
};

// Função para deletar um produto
export const deleteProductRecord = async (product: Stripe.Product) => {
  const { error: deletionError } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', product.id);

  if (deletionError)
    throw new Error(`Product deletion failed: ${deletionError.message}`);
};

// Função para deletar um preço
export const deletePriceRecord = async (price: Stripe.Price) => {
  const { error: deletionError } = await supabaseAdmin
    .from('prices')
    .delete()
    .eq('id', price.id);

  if (deletionError)
    throw new Error(`Price deletion failed: ${deletionError.message}`);
};

export const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };

  const { error: upsertError } = await supabaseAdmin
    .from('products')
    .upsert([productData]);

  if (upsertError) {
    throw new Error(`Product insert/update failed: ${upsertError.message}`);
  }
};

export const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS
  };

  const { error: upsertError } = await supabaseAdmin
    .from('prices')
    .upsert([priceData]);

  if (upsertError?.message.includes('foreign key constraint')) {
    throw new Error(
      `Price insert/update failed due to foreign key constraint: ${upsertError.message}`
    );
  } else if (upsertError) {
    throw new Error(`Price insert/update failed: ${upsertError.message}`);
  }
};
