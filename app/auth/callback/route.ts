import { createClient } from '@/utils/supabase/server'; // Certifique-se de que esta função está implementada corretamente
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers';
import { cookies } from 'next/headers'; // Importa cookies para Next.js

export async function GET(request: NextRequest) {
  // URL de requisição e código de autenticação da query string
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  // Verifica se há um código de autenticação
  if (code) {
    const cookieStore = cookies(); // Obter cookies do Next.js para manter a sessão
    const supabase = createClient(cookieStore); // Passa cookies ao cliente Supabase

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // Redireciona em caso de erro na troca de código por sessão
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/signin`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again."
        )
      );
    }
  }

  // Redireciona após a autenticação com sucesso
  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/account`,
      'Success!',
      'You are now signed in.'
    )
  );
}