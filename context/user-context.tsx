import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"
import { supabase } from "@/lib/supabase/browser-client"
import { User } from "@supabase/supabase-js"

type UserContextType = {
  user: User | null
  isPro: boolean
  setIsPro: (value: boolean) => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  isPro: false,
  setIsPro: () => {}
})

type UserProviderProps = {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_pro")
            .eq("id", session.user.id)
            .single()

          setIsPro(profile?.is_pro || false)
        } else {
          setIsPro(false)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, isPro, setIsPro }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
