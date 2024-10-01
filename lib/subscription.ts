import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function checkSubscriptionStatus(
  userId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .single()

  if (error) {
    console.error("Error checking subscription status:", error)
    return false
  }

  return data?.status === "active"
}

export async function updateSubscriptionStatus(
  userId: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from("subscriptions")
    .upsert({ user_id: userId, status })

  if (error) {
    console.error("Error updating subscription status:", error)
    throw error
  }
}
