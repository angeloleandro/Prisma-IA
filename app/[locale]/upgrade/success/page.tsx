"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { useUser } from "@/context/user-context"

export default function UpgradeSuccessPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateProStatus, refreshProStatus } = useUser()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")
    if (sessionId) {
      const handleUpgradeSuccess = async () => {
        try {
          const response = await fetch("/api/stripe/verify-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ sessionId })
          })

          if (response.ok) {
            await updateProStatus(true)
            await refreshProStatus()
            toast.success(t("Upgrade concluído com sucesso!"))
            router.push("/")
          } else {
            throw new Error("Failed to verify session")
          }
        } catch (error) {
          console.error("Error updating pro status:", error)
          toast.error(t("Erro ao processar o upgrade."))
          router.push("/upgrade/failed")
        } finally {
          setIsProcessing(false)
        }
      }

      handleUpgradeSuccess()
    } else {
      toast.error(t("Sessão de upgrade inválida."))
      router.push("/upgrade/failed")
    }
  }, [searchParams, updateProStatus, refreshProStatus, router, t])

  if (isProcessing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="mb-6 text-3xl font-bold">
          {t("Processando seu upgrade...")}
        </h1>
        <p>{t("Por favor, aguarde enquanto confirmamos seu pagamento.")}</p>
      </div>
    )
  }

  return null
}
