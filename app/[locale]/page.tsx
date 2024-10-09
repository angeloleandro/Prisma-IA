"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/browser-client"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        // Usuário autenticado, redirecionar para a página principal do app
        router.push("/dashboard")
      } else {
        // Usuário não autenticado, redirecionar para a página de login
        router.push("/login")
      }
    }

    checkSession()
  }, [router])

  return null
}