// middleware.ts

import { createClient, updateSession } from '@/utils/supabase/middleware';
import { i18nRouter } from 'next-i18n-router';
import { NextResponse, type NextRequest } from 'next/server';
import i18nConfig from './i18nConfig';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Excluir rotas de autenticação, pagamento e API do roteamento i18n
  if (
    !pathname.startsWith('/signin') &&
    !pathname.startsWith('/auth') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/payment') // Adicione outras rotas a serem excluídas conforme necessário
  ) {
    // Internacionalização (i18n)
    const i18nResult = i18nRouter(request, i18nConfig);
    if (i18nResult) return i18nResult;
  }

  // Atualizar a sessão (Vercel Payment)
  const sessionUpdateResponse = await updateSession(request);
  if (sessionUpdateResponse) return sessionUpdateResponse;

  try {
    // Criar o cliente Supabase e obter a sessão
    const { supabase, response } = createClient(request);
    const { data: sessionData } = await supabase.auth.getSession();

    // Usuários autenticados acessando a página inicial '/'
    if (sessionData?.session?.user && pathname === '/') {
      return NextResponse.redirect(new URL('/account', request.url));
    }

    // Usuários não autenticados acessando rotas protegidas
    if (!sessionData?.session?.user && isProtectedRoute(pathname)) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    // Usuários não autenticados acessando a página inicial '/', redirecionar para '/signin'
    if (!sessionData?.session?.user && pathname === '/') {
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
    '/[locale]',
    '/[locale]/',
    '/[locale]/chat',
    // Adicione outras rotas protegidas conforme necessário
  ];

  return protectedRoutes.some((route) => pathname.startsWith(route));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico (ícone da página)
     * - imagens (svg, png, jpg, jpeg, gif, webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
