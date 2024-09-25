"use client"

import initTranslations from "@/lib/i18n"
import { createInstance } from "i18next"
import { ReactNode } from "react"
import { I18nextProvider } from "react-i18next"

interface TranslationsProviderProps {
  children: ReactNode
  locale: string
  namespaces: string[]
  resources: any // Idealmente, você definiria um tipo mais específico para os recursos
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: TranslationsProviderProps) {
  const i18n = createInstance()

  initTranslations(locale, namespaces, i18n, resources)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
