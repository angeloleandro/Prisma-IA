import Pricing from '@/components/ui/Pricing'; // Corrigido o caminho
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import { cookies } from 'next/headers'; // Importa cookies do Next.js

export default async function PricingPage() {
  const cookieStore = cookies(); // Obtenção de cookies
  const supabase = createClient(cookieStore); // Criação do cliente Supabase passando os cookies

  // Obtenção de dados do usuário, produtos e assinatura de forma assíncrona
  const [user, products, subscription] = await Promise.all([
    getUser(supabase), // Obtém dados do usuário autenticado
    getProducts(supabase), // Obtém a lista de produtos disponíveis
    getSubscription(supabase) // Obtém a assinatura ativa do usuário, se houver
  ]);

  // Renderização do componente de preços, passando os dados obtidos
  return (
    <Pricing
      user={user}
      products={products ?? []} // Garante que o array de produtos seja vazio caso seja indefinido
      subscription={subscription} // Assinatura atual do usuário
    />
  );
}
