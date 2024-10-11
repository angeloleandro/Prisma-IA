import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/supabase/types"; // Importa o tipo Database do Vercel

// Função para criar o cliente Supabase para operações no lado do servidor
export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  // Usa o cookieStore do Next.js para gerenciar cookies
  const cookieStoreInstance = cookieStore || cookies(); // Compatibiliza com o sistema de cookies existente

  return createServerClient<Database>( // Usa o tipo Database do Vercel para garantir tipagem correta
    process.env.NEXT_PUBLIC_SUPABASE_URL!,  // URL do Supabase fornecida pelas variáveis de ambiente
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Chave anônima fornecida pelas variáveis de ambiente
    {
      cookies: {
        // Recupera um cookie pelo nome
        get(name: string) {
          return cookieStoreInstance.get(name)?.value;
        },
        // Define um cookie com nome, valor e opções (como caminho, validade etc.)
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStoreInstance.set({ name, value, ...options });
          } catch (error) {
            // Ignora o erro se o método for chamado de um componente de servidor
            // Isso pode ser ignorado se houver um middleware para atualizar as sessões do usuário
          }
        },
        // Remove um cookie pelo nome
        remove(name: string, options: CookieOptions) {
          try {
            cookieStoreInstance.set({ name, value: "", ...options });
          } catch (error) {
            // Ignora o erro se o método for chamado de um componente de servidor
            // Isso pode ser ignorado se houver um middleware para atualizar as sessões do usuário
          }
        }
      }
    }
  );
};