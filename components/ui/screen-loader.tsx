import { IconLoader2 } from "@tabler/icons-react"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface ScreenLoaderProps {}

export const ScreenLoader: FC<ScreenLoaderProps> = () => {
  const { t } = useTranslation()

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <IconLoader2 className="mt-4 size-12 animate-spin" />
      <span className="sr-only">{t("loading")}</span>
    </div>
  )
}
