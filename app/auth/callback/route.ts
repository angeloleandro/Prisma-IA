import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next")

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) throw error
      // Você pode querer fazer algo com os dados da sessão aqui
      console.log("Session established for user:", data.user?.id)
    } catch (error) {
      console.error("Error exchanging code for session:", error)
      // Aqui você pode redirecionar para uma página de erro
      return NextResponse.redirect(requestUrl.origin + "/error?message=auth_error")
    }
  }

  // Garanta que 'next' é uma rota válida para evitar redirecionamentos maliciosos
  const validRoutes = ["/dashboard", "/profile", "/settings"]; // adicione todas as rotas válidas
  if (next && validRoutes.includes(next)) {
    return NextResponse.redirect(requestUrl.origin + next)
  } else {
    return NextResponse.redirect(requestUrl.origin)
  }
}
