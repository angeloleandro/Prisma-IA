import React from "react"
import getStripe from "@/lib/stripe-client"

interface CheckoutButtonProps {
  priceId: string
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ priceId }) => {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          price: priceId
        })
      })

      const { sessionId } = await response.json()
      const stripe = await getStripe()

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error("Stripe redirect error:", error)
        }
      } else {
        console.error("Stripe failed to load")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      Subscribe
    </button>
  )
}

export default CheckoutButton
