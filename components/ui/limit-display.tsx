import { FC } from "react"
import { useTranslation } from "react-i18next"

interface LimitDisplayProps {
  used: number
  limit: number
}

export const LimitDisplay: FC<LimitDisplayProps> = ({ used, limit }) => {
  const { t } = useTranslation()

  return (
    <div className="text-xs italic">{t("limitDisplay", { used, limit })}</div>
  )
}
