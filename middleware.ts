// middleware.ts

import { createClient, updateSession } from '@/utils/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Atualizar a sessão
  const sessionUpdateResponse = await updateSession(request);
  if (sessionUpdateResponse) return sessionUpdateResponse;

  try {
    // Criar o cliente Supabase e obter a sessão
    const { supabase, response } = createClient(request);
    const { data: sessionData } = await supabase.auth.getSession();

    // Remover o redirecionamento para '/account'
    // if (sessionData?.session?.user && pathname === '/') {
    //   return NextResponse.redirect(new URL('/account', request.url));
    // }

    // Usuários não autenticados acessando rotas protegidas
    if (!sessionData?.session?.user && isProtectedRoute(pathname)) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    // Retorna a resposta padrão
    return response;
  } catch (e) {
    console.error('Erro no middleware:', e);
    return NextResponse.next();
  }
}

// Função auxiliar para determinar se uma rota é protegida
function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    '/dashboard',
    '/account',
    '/settings',
    '/workspace', // Adicione outras rotas protegidas conforme necessário
  ];

  return protectedRoutes.some((route) => pathname.startsWith(route));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
