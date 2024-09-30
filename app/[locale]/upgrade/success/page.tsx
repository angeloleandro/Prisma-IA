"use client"

import { useEffect, useContext } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { ChatbotUIContext } from "@/context/context"

export default function UpgradeSuccessPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { checkProStatus } = useContext(ChatbotUIContext)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")
    if (sessionId) {
      // Aqui você pode fazer uma chamada para o seu backend para verificar o status da sessão, se necessário
      checkProStatus()
      toast.success(t("Upgrade concluído com sucesso!"))
      router.push("/")
    } else {
      toast.error(t("Erro ao processar o upgrade."))
      router.push("/upgrade")
    }
  }, [searchParams, checkProStatus, router, t])

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="mb-6 text-3xl font-bold">
        {t("Processando seu upgrade...")}
      </h1>
      <p>{t("Por favor, aguarde enquanto confirmamos seu pagamento.")}</p>
    </div>
  )
}
