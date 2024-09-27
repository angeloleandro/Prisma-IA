"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"

export default function UpgradePage() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setIsPro } = useContext(ChatbotUIContext)

  useEffect(() => {
    const success = searchParams.get("success")
    const canceled = searchParams.get("canceled")

    if (success) {
      toast.success(t("Upgrade successful! You are now a Pro user."))
      setIsPro(true)
      // Não redirecione imediatamente, dê tempo para o usuário ver a mensagem
      setTimeout(() => router.push("/"), 2000)
    } else if (canceled) {
      toast.error(t("Upgrade canceled. You can try again anytime."))
      setTimeout(() => router.push("/"), 2000)
    }
  }, [searchParams, router, t, setIsPro])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">
          {t("Processing your upgrade...")}
        </h1>
        <p>{t("Please wait while we confirm your payment.")}</p>
      </div>
    </div>
  )
}
