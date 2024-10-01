import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

let stripeInstance: Stripe | null = null

const getStripe = (): Stripe => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20" // Atualizado para a versão mais recente
    })
  }
  return stripeInstance as Stripe // Garantindo que sempre retornamos uma instância de Stripe
}

export default getStripe
