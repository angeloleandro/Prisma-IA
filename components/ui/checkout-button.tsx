import React from "react"

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

      // Aqui removemos a lógica que utilizava getStripe e stripe.redirecToCheckout.
      // Você deve substituir a lógica por uma abordagem apropriada para redirecionamento
      // ou pagamento com o Stripe diretamente se necessário.

      window.location.href = `/checkout/${sessionId}`
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
