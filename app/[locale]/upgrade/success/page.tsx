"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { useUser } from "@/context/user-context"

export default function UpgradeSuccessPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateProStatus, refreshProStatus } = useUser()

  useEffect(() => {
    const sessionId = searchParams.get("session_id")
    if (sessionId) {
      const handleUpgradeSuccess = async () => {
        try {
          await updateProStatus(true)
          await refreshProStatus()
          toast.success(t("Upgrade concluído com sucesso!"))
          router.push("/")
        } catch (error) {
          console.error("Error updating pro status:", error)
          toast.error(t("Erro ao processar o upgrade."))
          router.push("/upgrade")
        }
      }

      handleUpgradeSuccess()
    } else {
      toast.error(t("Erro ao processar o upgrade."))
      router.push("/upgrade")
    }
  }, [searchParams, updateProStatus, refreshProStatus, router, t])

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="mb-6 text-3xl font-bold">
        {t("Processando seu upgrade...")}
      </h1>
      <p>{t("Por favor, aguarde enquanto confirmamos seu pagamento.")}</p>
    </div>
  )
}
