"use client"

import { checkSubscriptionStatus } from "@/lib/subscription"
import { ChatbotUIContext } from "@/context/context"
import {
  getProfileByUserId,
  updateProfile,
  createProfileIfNotExists
} from "@/db/profile"
import {
  getHomeWorkspaceByUserId,
  getWorkspacesByUserId
} from "@/db/workspaces"
import { supabase } from "@/lib/supabase/browser-client"
import { TablesUpdate } from "@/supabase/types"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Finish } from "../../../components/setup/finish-step" // Atualize a importação aqui
import { ProfileStep } from "../../../components/setup/profile-step"
import {
  SETUP_STEP_COUNT,
  StepContainer
} from "../../../components/setup/step-container"

export default function SetupPage() {
  const { t } = useTranslation()

  const { profile, setProfile, setWorkspaces, setSelectedWorkspace, setIsPro } =
    useContext(ChatbotUIContext)

  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentStep, setCurrentStep] = useState(1)

  // Profile Step
  const [displayName, setDisplayName] = useState("")
  const [username, setUsername] = useState(profile?.username || "")
  const [usernameAvailable, setUsernameAvailable] = useState(true)

  useEffect(() => {
    const initializeSetup = async () => {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession()
        if (sessionError) throw sessionError

        const session = sessionData.session
        if (!session) {
          return router.push("/login")
        }

        const user = session.user
        let profile = await getProfileByUserId(user.id)
        if (!profile) {
          profile = await createProfileIfNotExists(user.id)
        }

        if (profile) {
          setProfile(profile)
          setUsername(profile.username || "")
          setIsPro(profile.is_pro ?? false)

          if (!profile.has_onboarded) {
            setLoading(false)
          } else {
            const homeWorkspaceId = await getHomeWorkspaceByUserId(user.id)
            return router.push(`/${homeWorkspaceId}/chat`)
          }
        } else {
          throw new Error("Failed to create or fetch profile")
        }
      } catch (error) {
        console.error("Setup initialization error:", error)
        setError("An error occurred during setup. Please try again.")
        setLoading(false)
      }
    }

    initializeSetup()
  }, [])

  const handleShouldProceed = (proceed: boolean) => {
    if (proceed) {
      if (currentStep === SETUP_STEP_COUNT) {
        handleSaveSetupSetting()
      } else {
        setCurrentStep(currentStep + 1)
      }
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveSetupSetting = async () => {
    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession()
      if (sessionError) throw sessionError

      const session = sessionData.session
      if (!session) {
        return router.push("/login")
      }

      const user = session.user
      const profile = await getProfileByUserId(user.id)

      if (profile) {
        const updateProfilePayload: TablesUpdate<"profiles"> = {
          ...profile,
          has_onboarded: true,
          display_name: displayName,
          username
        }

        const updatedProfile = await updateProfile(
          profile.id,
          updateProfilePayload
        )
        setProfile(updatedProfile)
        setIsPro(updatedProfile.is_pro ?? false)

        const workspaces = await getWorkspacesByUserId(profile.user_id)
        const homeWorkspace = workspaces.find(w => w.is_home)

        const isProUser = await checkSubscriptionStatus(profile.user_id)
        setIsPro(isProUser)

        if (homeWorkspace) {
          setSelectedWorkspace(homeWorkspace)
          setWorkspaces(workspaces)
          return router.push(`/${homeWorkspace.id}/chat`)
        } else {
          throw new Error("No home workspace found")
        }
      } else {
        throw new Error("Profile not found")
      }
    } catch (error) {
      console.error("Error saving setup settings:", error)
      setError(
        "An error occurred while saving your settings. Please try again."
      )
    }
  }

  const renderStep = (stepNum: number) => {
    switch (stepNum) {
      // Profile Step
      case 1:
        return (
          <StepContainer
            stepDescription={t("profileStepDescription")}
            stepNum={currentStep}
            stepTitle={t("welcomeToChatbotUI")}
            onShouldProceed={handleShouldProceed}
            showNextButton={!!(username && usernameAvailable)}
            showBackButton={false}
            totalSteps={2}
          >
            <ProfileStep
              username={username}
              usernameAvailable={usernameAvailable}
              displayName={displayName}
              onUsernameAvailableChange={setUsernameAvailable}
              onUsernameChange={setUsername}
              onDisplayNameChange={setDisplayName}
            />
          </StepContainer>
        )

      // Finish Step
      case 2:
        return (
          <StepContainer
            stepDescription={t("finishStepDescription")}
            stepNum={currentStep}
            stepTitle={t("setupComplete")}
            onShouldProceed={handleShouldProceed}
            showNextButton={true}
            showBackButton={true}
            totalSteps={2}
          >
            <Finish displayName={displayName} />
          </StepContainer>
        )
      default:
        return null
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="flex h-full items-center justify-center">
      {renderStep(currentStep)}
    </div>
  )
}