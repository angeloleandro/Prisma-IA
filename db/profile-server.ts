import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const upgradeToProStatus = async (userId: string) => {
  const supabase = createClient(cookies())

  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .update({ is_pro: true })
    .eq("user_id", userId)
    .select("*")
    .single()

  if (error) {
    console.error("Error upgrading to Pro:", error)
    throw new Error(error.message)
  }

  console.log("Profile upgraded to Pro successfully:", updatedProfile)
  return updatedProfile
}
