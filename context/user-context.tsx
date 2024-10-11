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
  refreshProStatus: () => Promise<void>
  updateProStatus: (isPro: boolean) => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  isPro: false,
  setIsPro: () => {},
  refreshProStatus: async () => {},
  updateProStatus: async () => {}
})

type UserProviderProps = {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isPro, setIsPro] = useState(false)

  const refreshProStatus = async () => {
    if (user) {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_pro")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Error fetching pro status:", error)
        return
      }

      setIsPro(profile?.is_pro || false)
    }
  }

  const updateProStatus = async (newProStatus: boolean) => {
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ is_pro: newProStatus })
        .eq("id", user.id)
        .select()

      if (error) {
        console.error("Error updating pro status:", error)
        return
      }

      setIsPro(newProStatus)
    }
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {  // '_event' indica que o valor não será utilizado
        setUser(session?.user ?? null)
        if (session?.user) {
          await refreshProStatus()
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
    <UserContext.Provider
      value={{ user, isPro, setIsPro, refreshProStatus, updateProStatus }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
