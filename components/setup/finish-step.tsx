import { FC } from "react"
import { useTranslation } from "react-i18next"

interface FinishProps {
  displayName: string
}

export const Finish: FC<FinishProps> = ({ displayName }) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <div>
        {t("welcomeToChatbotUI")}
        {displayName.length > 0 ? `, ${displayName.split(" ")[0]}` : null}!
      </div>

      <div>{t("clickNextToStartChatting")}</div>
    </div>
  )
}
