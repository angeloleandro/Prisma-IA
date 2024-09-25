import { ContentType } from "@/types"
import { FC } from "react"
import { Input } from "../ui/input"

interface SidebarSearchProps {
  contentType: ContentType
  searchTerm: string
  setSearchTerm: Function
  placeholder: string
}

export const SidebarSearch: FC<SidebarSearchProps> = ({
  contentType,
  searchTerm,
  setSearchTerm,
  placeholder
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  )
}
