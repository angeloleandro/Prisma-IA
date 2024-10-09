import { createClient, updateSession } from '@/utils/supabase/middleware';
import { i18nRouter } from 'next-i18n-router';
import { NextResponse, type NextRequest } from 'next/server';
import i18nConfig from './i18nConfig';

export async function middleware(request: NextRequest) {
  // Internacionalização (i18n)
  const i18nResult = i18nRouter(request, i18nConfig);
  if (i18nResult) return i18nResult;

  // Atualizar a sessão (Vercel Payment)
  const sessionUpdateResponse = await updateSession(request);
  if (sessionUpdateResponse) return sessionUpdateResponse;

  try {
    // Criar o cliente Supabase e obter a sessão
    const { supabase, response } = createClient(request);
    const { data: sessionData } = await supabase.auth.getSession();

    // Se o usuário estiver logado e tentar acessar a home page ("/"), redirecionar para o chat
    if (sessionData?.session?.user && request.nextUrl.pathname === '/') {
      const userId = sessionData.session.user.id;

      // Buscar o workspace padrão do usuário
      const { data: homeWorkspace, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('user_id', userId)
        .eq('is_home', true)
        .single();

      // Caso ocorra um erro ao buscar o workspace ou o workspace não seja encontrado
      if (error || !homeWorkspace) {
        console.error('Erro ao buscar workspace:', error?.message || 'Workspace não encontrado.');
        return NextResponse.redirect(new URL('/login', request.url)); // Redireciona para a página de login ou outra apropriada
      }

      // Redirecionar o usuário para o workspace de chat após login
      return NextResponse.redirect(new URL(`/${homeWorkspace.id}/chat`, request.url));
    }

    // Retorna a resposta padrão (caso a sessão não exista ou não haja redirecionamento necessário)
    return response;
  } catch (e) {
    console.error('Erro no middleware:', e);
    // Retornar a requisição padrão no caso de falha (passando adiante)
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

// Configuração do middleware para corresponder a certas rotas
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
