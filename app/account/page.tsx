// Importações necessárias
import CustomerPortalForm from "@/components/ui/AccountForms/CustomerPortalForm"
import EmailForm from "@/components/ui/AccountForms/EmailForm"
import NameForm from "@/components/ui/AccountForms/NameForm"
import { redirect } from "next/navigation" // Certificando que o redirect está corretamente importado
import { cookies } from "next/headers" // Importa os cookies do Next.js
import { createClient } from "@/utils/supabase/server" // Certifique-se de que esse caminho está correto
import {
  getUserDetails,
  getSubscription,
  getUser
} from "@/utils/supabase/queries" // Certifique-se de que o caminho está correto

export default async function Account() {
  const cookieStore = cookies() // Obtendo os cookies do Next.js
  const supabase = createClient(cookieStore) // Passando os cookies ao cliente Supabase

  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase), // Função para obter o usuário
    getUserDetails(supabase), // Função para obter os detalhes do usuário
    getSubscription(supabase) // Função para obter a assinatura
  ])

  // Verificando se o usuário não está autenticado
  if (!user) {
    return redirect("/signin")
  }

  return (
    <section className="mb-32 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4">
        {/* Componente para o portal do cliente */}
        <CustomerPortalForm subscription={subscription} />
        {/* Componente para o formulário de nome */}
        <NameForm userName={userDetails?.full_name ?? ""} />
        {/* Componente para o formulário de email */}
        <EmailForm userEmail={user.email} />
      </div>
    </section>
  )
}
