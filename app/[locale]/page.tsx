"use client"

import { Brand } from "@/components/ui/brand"
import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function HomePage() {
  const { theme } = useTheme()
  const { t } = useTranslation()

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Brand theme={theme as "dark" | "light"} />

      <Link
        className="mt-4 flex w-[200px] items-center justify-center rounded-md bg-blue-500 p-2 font-semibold"
        href="/login"
      >
        {t("startChatting")}
        <IconArrowRight className="ml-1" size={20} />
      </Link>
    </div>
  )
}
