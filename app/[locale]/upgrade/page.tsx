"use client"

import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useState, useContext, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChatbotUIContext } from "@/context/context"

export default function UpgradePage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { profile, isPro, checkProStatus, updateProStatus } =
    useContext(ChatbotUIContext)

  const fetchProStatus = useCallback(async () => {
    try {
      await checkProStatus()
    } catch (error) {
      console.error("Erro ao verificar o status Pro:", error)
      toast.error(
        t("Erro ao verificar o status da conta. Por favor, tente novamente.")
      )
    }
  }, [checkProStatus, t])

  useEffect(() => {
    fetchProStatus()
  }, [fetchProStatus])

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      if (!profile || !profile.id) {
        throw new Error("Perfil de usuário não encontrado")
      }

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: profile.id })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Falha ao criar sessão do Stripe")
      }

      const { sessionUrl } = await response.json()

      if (sessionUrl) {
        window.location.href = sessionUrl
      } else {
        throw new Error("URL da sessão não retornada")
      }
    } catch (error) {
      console.error("Erro ao atualizar para Pro:", error)
      toast.error(
        t(
          "Erro ao iniciar o processo de atualização. Por favor, tente novamente."
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (isPro) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="mb-6 text-3xl font-bold">
          {t("Você já é um usuário Pro!")}
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        {t("Atualize para o Plano Pro")}
      </h1>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="bg-background text-foreground border-border flex flex-1 flex-col rounded-lg border p-6 shadow-md">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{t("Gratuito")}</h2>
            <p className="mb-4 text-3xl font-bold">
              R$0<span className="text-sm font-normal">{t("/mês")}</span>
            </p>
            <ul className="mb-6 space-y-2">
              <li>{t("Modelo de IA básico para teste")}</li>
              <li>
                {t("Ferramentas de modelos liberadas para IA básica de teste")}
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/")}
            >
              {t("Permanecer no Gratuito")}
            </Button>
          </div>
        </div>
        <div className="bg-background text-foreground border-primary flex flex-1 flex-col rounded-lg border-2 p-6 shadow-md">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">{t("Pro")}</h2>
            <p className="mb-4 text-3xl font-bold">
              R$97<span className="text-sm font-normal">{t("/mês")}</span>
            </p>
            <p className="mb-4 text-sm">{t("cobrado mensalmente")}</p>
            <ul className="mb-6 space-y-2">
              <li>{t("Use os modelos mais avançados de IA do Mercado")}</li>
              <li>{t("Biblioteca de Prompts")}</li>
              <li>{t("Configurações de Chat Reutilizáveis")}</li>
              <li>{t("Assistentes de IA e Ferramentas")}</li>
              <li>{t("Arquivos e Recuperação")}</li>
              <li>{t("Espaços de Trabalho")}</li>
              <li>{t("Mensagens Mais Rápidas")}</li>
            </ul>
          </div>
          <div className="mt-auto">
            <Button
              className="w-full"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? t("Processando...") : t("Atualizar para Pro")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
