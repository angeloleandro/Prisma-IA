import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./tooltip"

interface WithTooltipProps {
  display: React.ReactNode | string
  trigger: React.ReactNode

  delayDuration?: number
  side?: "left" | "right" | "top" | "bottom"
}

export const WithTooltip: FC<WithTooltipProps> = ({
  display,
  trigger,

  delayDuration = 500,
  side = "right"
}) => {
  const { t } = useTranslation()

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>

        <TooltipContent side={side}>
          {typeof display === "string" ? t(display) : display}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
