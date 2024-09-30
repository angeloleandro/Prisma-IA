import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getProfileByUserId } from "@/db/profile"

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

      if (data.user) {
        const profile = await getProfileByUserId(data.user.id)
        if (profile) {
          console.log("User Pro status:", profile.is_pro)
          // Here you can update the global state or do something with the Pro status
        }
      }

      console.log("Session established for user:", data.user?.id)
    } catch (error) {
      console.error("Error exchanging code for session:", error)
      return NextResponse.redirect(
        requestUrl.origin + "/error?message=auth_error"
      )
    }
  }

  const validRoutes = ["/dashboard", "/profile", "/settings", "/upgrade"]
  if (next && validRoutes.includes(next)) {
    return NextResponse.redirect(requestUrl.origin + next)
  } else {
    return NextResponse.redirect(requestUrl.origin)
  }
}
