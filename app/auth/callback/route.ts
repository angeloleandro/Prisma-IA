// app/auth/callback/route.ts

import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `/signin`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again."
        )
      )
    }
  }

  // Redireciona após a autenticação com sucesso
  return NextResponse.redirect(
    getStatusRedirect(`/account`, "Success!", "You are now signed in.")
  )
}

// Atualização conforme a nova recomendação do Next.js
export const runtime = "nodejs"
