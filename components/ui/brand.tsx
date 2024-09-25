"use client"

import Link from "next/link"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { PrismaIASVG } from "../icons/prisma-ia-svg"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  const { t } = useTranslation()

  return (
    <Link
      className="flex cursor-pointer flex-col items-center hover:opacity-50"
      href="https://www.prisma-ia.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="mb-2">
        <PrismaIASVG theme={theme === "dark" ? "dark" : "light"} scale={0.15} />
      </div>

      <div className="text-4xl font-bold tracking-wide">{t("prismaIA")}</div>
    </Link>
  )
}
