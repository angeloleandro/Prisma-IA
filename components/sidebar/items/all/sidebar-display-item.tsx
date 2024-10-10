// components/sidebar/items/all/sidebar-display-item.tsx

import { cn } from "@/lib/utils"
import { FC, useRef } from "react"
import { SidebarUpdateItem } from "./sidebar-update-item"
import { ContentType } from "@/types" // Supondo que ContentType esteja definido aqui.

interface SidebarItemProps {
  item: any
  isTyping: boolean
  contentType: ContentType // Usando o tipo correto aqui.
  icon: React.ReactNode
  updateState: any
  renderInputs: (renderState: any) => JSX.Element
}

export const SidebarItem: FC<SidebarItemProps> = ({
  item,
  contentType, // Certifique-se de que esse valor é do tipo ContentType
  updateState,
  renderInputs,
  icon,
  isTyping
}) => {
  const itemRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation()
      itemRef.current?.click()
    }
  }

  return (
    <SidebarUpdateItem
      item={item}
      isTyping={isTyping}
      contentType={contentType} // Usando o tipo correto
      updateState={updateState}
      renderInputs={renderInputs}
    >
      <div
        ref={itemRef}
        className={cn(
          "flex w-full cursor-pointer items-center rounded p-2 hover:bg-accent hover:opacity-50 focus:outline-none"
        )}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {icon}

        <div className="ml-3 flex-1 truncate text-sm font-semibold">
          {item.name}
        </div>
      </div>
    </SidebarUpdateItem>
  )
}
