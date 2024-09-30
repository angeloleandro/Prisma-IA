"use client"

import { getProfileByUserId } from "@/db/profile"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"

export default function UpgradeSuccessPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { setIsPro, setProfile } = useContext(ChatbotUIContext)

  useEffect(() => {
    // Atualizar o contexto
    setIsPro(true)
    setProfile(prevProfile =>
      prevProfile ? { ...prevProfile, is_pro: true } : null
    )
  }, [setIsPro, setProfile])

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="mb-6 text-3xl font-bold">
        {t("Parabéns! Você agora é um usuário Pro!")}
      </h1>
      <p className="mb-6">
        {t("Aproveite todos os recursos premium do nosso serviço.")}
      </p>
      <Button onClick={() => router.push("/")}>
        {t("Ir para o Dashboard")}
      </Button>
    </div>
  )
}
