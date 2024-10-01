import { createClient } from "@/lib/supabase/middleware"
import { i18nRouter } from "next-i18n-router"
import { NextResponse, type NextRequest } from "next/server"
import i18nConfig from "./i18nConfig"

export async function middleware(request: NextRequest) {
  const i18nResult = i18nRouter(request, i18nConfig)
  if (i18nResult) return i18nResult

  try {
    const { supabase, response } = createClient(request)

    const session = await supabase.auth.getSession()

    if (session) {
      // Verificar status Pro
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_pro")
        .eq("id", session.data.session?.user.id)
        .single()

      const isPro = profile?.is_pro || false

      // Redirecionar usuários não-Pro tentando acessar recursos Pro
      const isAccessingProFeature = request.nextUrl.pathname.startsWith('/pro-features')
      if (isAccessingProFeature && !isPro) {
        return NextResponse.redirect(new URL('/upgrade', request.url))
      }
    }

    const redirectToChat = session && request.nextUrl.pathname === "/"

    if (redirectToChat) {
      const { data: homeWorkspace, error } = await supabase
        .from("workspaces")
        .select("*")
        .eq("user_id", session.data.session?.user.id)
        .eq("is_home", true)
        .single()

      if (!homeWorkspace) {
        throw new Error(error?.message)
      }

      return NextResponse.redirect(
        new URL(`/${homeWorkspace.id}/chat`, request.url)
      )
    }

    return response
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    })
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|auth).*)"
}
