import React, { forwardRef } from "react"
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

export const WithTooltip = forwardRef<HTMLDivElement, WithTooltipProps>(
  ({ display, trigger, delayDuration = 500, side = "right" }, ref) => {
    const { t } = useTranslation()

    return (
      <TooltipProvider delayDuration={delayDuration}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div ref={ref}>{trigger}</div>
          </TooltipTrigger>

          <TooltipContent side={side}>
            {typeof display === "string" ? t(display) : display}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

WithTooltip.displayName = "WithTooltip"
