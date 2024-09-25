import { ContentType } from "@/types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { TabsTrigger } from "../ui/tabs"
import { WithTooltip } from "../ui/with-tooltip"

interface SidebarSwitchItemProps {
  contentType: ContentType
  icon: React.ReactNode
  onContentTypeChange: (contentType: ContentType) => void
  tooltip?: string
}

export const SidebarSwitchItem: FC<SidebarSwitchItemProps> = ({
  contentType,
  icon,
  onContentTypeChange,
  tooltip
}) => {
  const { t } = useTranslation()

  return (
    <WithTooltip
      display={<div>{tooltip || t(contentType)}</div>}
      trigger={
        <TabsTrigger
          className="hover:opacity-50"
          value={contentType}
          onClick={() => onContentTypeChange(contentType as ContentType)}
          asChild
        >
          <div>{icon}</div>
        </TabsTrigger>
      }
    />
  )
}
