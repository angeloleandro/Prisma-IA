import { NextResponse } from 'next/server';
import getStripe from '@/lib/stripe'; // Importação corrigida
import { getErrorRedirect } from '@/utils/helpers';

export async function POST(req: Request) {
  try {
    const { priceId, userId } = await req.json();
    
    // Obtendo a instância do Stripe
    const stripe = getStripe(); 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}