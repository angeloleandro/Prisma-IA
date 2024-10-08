import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers'; // Correto caminho para importar cookies
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers';

export async function GET(request: NextRequest) {
  // A rota `/auth/callback` é necessária para a troca do código de autenticação pelo token de sessão.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    // Obtenha o cookieStore do Next.js para ser passado ao createClient
    const cookieStore = cookies();

    // Cria o cliente do Supabase com o cookieStore
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/signin/forgot_password`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again."
        )
      );
    }
  }

  // URL para redirecionar após a conclusão do processo de login
  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/signin/update_password`,
      'You are now signed in.',
      'Please enter a new password for your account.'
    )
  );
}