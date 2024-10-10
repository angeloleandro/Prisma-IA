// utils/supabase/middleware.ts

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Função para criar o cliente Supabase e gerenciar cookies
export const createClient = (request: NextRequest) => {
  // Cria uma resposta inicial não modificada
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Criação do cliente Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Recupera o valor do cookie pelo nome
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        // Define um cookie e atualiza a resposta
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        // Remove um cookie e atualiza a resposta
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  return { supabase, response };
};

// Função para atualizar a sessão do usuário
export const updateSession = async (request: NextRequest) => {
  try {
    // Criação do cliente Supabase e da resposta
    const { supabase, response } = createClient(request);

    // Atualiza a sessão se expirada (necessário para Server Components)
    await supabase.auth.getUser();

    return response;
  } catch (e) {
    // Se a criação do cliente Supabase falhar
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
