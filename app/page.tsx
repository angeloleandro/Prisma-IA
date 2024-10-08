import Pricing from '@/components/ui/Pricing'; // Corrigido o caminho
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import { cookies } from 'next/headers'; // Importa cookies do Next.js

export default async function PricingPage() {
  const cookieStore = cookies(); // Obter cookies
  const supabase = createClient(cookieStore); // Passa o cookieStore para o cliente

  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <Pricing
      user={user}
      products={products ?? []}
      subscription={subscription}
    />
  );
}
