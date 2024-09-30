import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getProfileByUserId = async (userId: string) => {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching profile:", error)
    throw new Error(error.message)
  }

  if (profiles.length === 0) {
    console.log("No profile found for user:", userId)
    return null
  }

  if (profiles.length > 1) {
    console.warn("Multiple profiles found for user:", userId)
  }

  const profile = profiles[0]
  console.log("Fetched profile:", profile)
  return profile
}

export const getProfilesByUserId = async (userId: string) => {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching profiles:", error)
    throw new Error(error.message)
  }

  return profiles || []
}

export const createProfile = async (profile: TablesInsert<"profiles">) => {
  const { data: createdProfile, error } = await supabase
    .from("profiles")
    .insert([profile])
    .select("*")
    .single()

  if (error) {
    console.error("Error creating profile:", error)
    throw new Error(error.message)
  }

  return createdProfile
}

export const updateProfile = async (
  profileId: string,
  profile: TablesUpdate<"profiles">
) => {
  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", profileId)
    .select("*")
    .single()

  if (error) {
    console.error("Error updating profile:", error)
    throw new Error(error.message)
  }

  console.log("Profile updated successfully:", updatedProfile)
  return updatedProfile
}

export const deleteProfile = async (profileId: string) => {
  const { error } = await supabase.from("profiles").delete().eq("id", profileId)

  if (error) {
    console.error("Error deleting profile:", error)
    throw new Error(error.message)
  }

  return true
}

export const upgradeToProStatus = async (userId: string) => {
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

export const createProfileIfNotExists = async (userId: string) => {
  const existingProfile = await getProfileByUserId(userId)
  if (!existingProfile) {
    const newProfile: TablesInsert<"profiles"> = {
      user_id: userId,
      is_pro: false,
      username: "",
      display_name: "",
      image_url: "",
      bio: "",
      profile_context: "",
      has_onboarded: false,
      use_azure_openai: false,
      image_path: ""
    }
    const { data, error } = await supabase
      .from("profiles")
      .insert([newProfile])
      .select()
      .single()

    if (error) {
      console.error("Error creating profile:", error)
      throw new Error(error.message)
    }

    console.log("Created new profile:", data)
    return data
  }
  return existingProfile
}