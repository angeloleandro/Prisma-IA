import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
  {
    // Defina a versão correta ou remova essa linha se não precisar especificar
    apiVersion: '2024-06-20', // Certifique-se de usar a versão atual ou remova a linha se não precisar definir a versão
    appInfo: {
      name: 'Next.js Subscription Starter',
      version: '0.0.0',
      url: 'https://github.com/vercel/nextjs-subscription-payments'
    }
  }
);