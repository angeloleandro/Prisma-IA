// components/ui/Navbar/Navbar.tsx

"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/browser-client"
import s from "./Navbar.module.css"
import Navlinks from "./Navlinks"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    fetchUser()
  }, [])

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <Navlinks user={user} />
      </div>
    </nav>
  )
}
