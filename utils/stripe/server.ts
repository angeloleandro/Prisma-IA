'use server';

import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/config'; 
import { supabaseAdmin, createOrRetrieveCustomer } from '@/utils/supabase/admin'; 
import { getURL, getErrorRedirect, calculateTrialEndUnixTimestamp } from '@/utils/helpers';
import { Tables } from '@/types/types_db';

type Price = Tables<'prices'>;

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

export async function checkoutWithStripe(
  price: Price,
  redirectPath: string = '/account'
): Promise<CheckoutResponse> {
  try {
    const {
      data: { user }
    } = await supabaseAdmin.auth.getUser();

    if (!user) {
      throw new Error('Could not get user session.');
    }

    // Recuperar ou criar o cliente no Stripe
    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || ''
    });

    // Configurar os parâmetros da sessão de checkout no Stripe
    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer,
      customer_update: {
        address: 'auto'
      },
      line_items: [
        {
          price: price.id,
          quantity: 1
        }
      ],
      cancel_url: getURL(),
      success_url: getURL(redirectPath)
    };

    // Verificar tipo de preço (recorrente ou pagamento único)
    if (price.type === 'recurring') {
      params = {
        ...params,
        mode: 'subscription',
        subscription_data: {
          trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days)
        }
      };
    } else if (price.type === 'one_time') {
      params = {
        ...params,
        mode: 'payment'
      };
    }

    // Criar sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create(params);
    return { sessionId: session.id };
  } catch (error) {
    return {
      errorRedirect: getErrorRedirect(
        redirectPath,
        error instanceof Error ? error.message : 'An unknown error occurred.',
        'Please try again later or contact a system administrator.'
      )
    };
  }
}

export async function createStripePortal(currentPath: string) {
  try {
    const {
      data: { user }
    } = await supabaseAdmin.auth.getUser();

    if (!user) {
      throw new Error('Could not get user session.');
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user.id || '',
      email: user.email || ''
    });

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: getURL('/account')
    });

    return url;
  } catch (error) {
    return getErrorRedirect(
      currentPath,
      error instanceof Error ? error.message : 'An unknown error occurred.',
      'Please try again later or contact a system administrator.'
    );
  }
}
