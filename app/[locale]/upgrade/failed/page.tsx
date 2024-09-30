"use client"

import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function UpgradeFailedPage() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="mb-6 text-3xl font-bold">
        {t("Oops! Algo deu errado com sua atualização.")}
      </h1>
      <p className="mb-6">
        {t(
          "Não se preocupe, nenhuma cobrança foi feita. Por favor, tente novamente ou entre em contato com o suporte se o problema persistir."
        )}
      </p>
      <Button onClick={() => router.push("/upgrade")}>
        {t("Tentar Novamente")}
      </Button>
    </div>
  )
}
