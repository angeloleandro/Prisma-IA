"use client"

import { useChatHandler } from "@/components/chat/chat-hooks/use-chat-handler"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { ChatbotUIContext } from "@/context/context"
import { createWorkspace } from "@/db/workspaces"
import useHotkey from "@/lib/hooks/use-hotkey"
import { IconBuilding, IconHome, IconPlus, IconSettings } from "@tabler/icons-react"
import { ChevronsUpDown } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface WorkspaceSwitcherProps {}

export const WorkspaceSwitcher: FC<WorkspaceSwitcherProps> = ({}) => {
  const { t } = useTranslation()
  useHotkey(";", () => setOpen(prevState => !prevState))

  const {
    workspaces,
    workspaceImages,
    selectedWorkspace,
    setSelectedWorkspace,
    setWorkspaces
  } = useContext(ChatbotUIContext)

  const { handleNewChat } = useChatHandler()

  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!selectedWorkspace) return
    setValue(selectedWorkspace.id)
  }, [selectedWorkspace])

  const handleCreateWorkspace = async () => {
    if (!selectedWorkspace) return

    const createdWorkspace = await createWorkspace({
      user_id: selectedWorkspace.user_id,
      default_context_length: selectedWorkspace.default_context_length,
      default_model: selectedWorkspace.default_model,
      default_prompt: selectedWorkspace.default_prompt,
      default_temperature: selectedWorkspace.default_temperature,
      description: "",
      embeddings_provider: "openai",
      include_profile_context: selectedWorkspace.include_profile_context,
      include_workspace_instructions:
        selectedWorkspace.include_workspace_instructions,
      instructions: selectedWorkspace.instructions,
      is_home: false,
      name: t("newWorkspace")
    })

    setWorkspaces([...workspaces, createdWorkspace])
    setSelectedWorkspace(createdWorkspace)
    setOpen(false)

    return router.push(`/${createdWorkspace.id}/chat`)
  }

  const getWorkspaceName = (workspaceId: string) => {
    const workspace = workspaces.find(workspace => workspace.id === workspaceId)
    return workspace ? workspace.name : ""
  }

  const truncateWorkspaceName = (name: string, maxLength: number) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name
  }

  const handleSelect = (workspaceId: string) => {
    const workspace = workspaces.find(workspace => workspace.id === workspaceId)
    if (!workspace) return
    setSelectedWorkspace(workspace)
    setOpen(false)
    return router.push(`/${workspace.id}/chat`)
  }

  const workspaceImage = workspaceImages.find(
    image => image.workspaceId === selectedWorkspace?.id
  )
  const imageSrc = workspaceImage
    ? workspaceImage.url
    : selectedWorkspace?.is_home
      ? ""
      : ""

  const IconComponent = selectedWorkspace?.is_home ? IconHome : IconBuilding

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="border-input flex h-[36px]
        w-full cursor-pointer items-center justify-between rounded-md border px-2 py-1 hover:opacity-50"
      >
        <div className="flex items-center truncate">
          {selectedWorkspace && (
            <div className="flex items-center">
              {workspaceImage ? (
                <Image
                  style={{ width: "22px", height: "22px" }}
                  className="mr-2 rounded"
                  src={imageSrc}
                  width={22}
                  height={22}
                  alt={selectedWorkspace.name}
                />
              ) : (
                <IconComponent className="mr-2" size={22} />
              )}
            </div>
          )}

          <span className="truncate max-w-[100px]">
            {truncateWorkspaceName(getWorkspaceName(value), 10) || t("selectWorkspace")}
          </span>
        </div>

        <div className="flex items-center space-x-1 ml-2">
          <IconSettings size={18} className="opacity-50" />
          <ChevronsUpDown size={18} className="opacity-50" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-2">
        <div className="space-y-2">
          <Button
            className="flex w-full items-center justify-start space-x-2"
            size="sm"
            onClick={handleCreateWorkspace}
          >
            <IconPlus size={18} />
            <span>{t("newWorkspace")}</span>
          </Button>

          <Input
            placeholder={t("searchWorkspaces")}
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="flex flex-col space-y-1">
            {workspaces
              .filter(workspace => workspace.is_home)
              .map(workspace => {
                const image = workspaceImages.find(
                  image => image.workspaceId === workspace.id
                )

                return (
                  <Button
                    key={workspace.id}
                    className="flex items-center justify-start"
                    variant="ghost"
                    onClick={() => handleSelect(workspace.id)}
                  >
                    {image ? (
                      <Image
                        style={{ width: "22px", height: "22px" }}
                        className="mr-2 rounded"
                        src={image.url || ""}
                        width={22}
                        height={22}
                        alt={workspace.name}
                      />
                    ) : (
                      <IconHome className="mr-2" size={22} />
                    )}

                    <span className="text-sm font-medium">{workspace.name}</span>
                  </Button>
                )
              })}

            {workspaces
              .filter(
                workspace =>
                  !workspace.is_home &&
                  workspace.name.toLowerCase().includes(search.toLowerCase())
              )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(workspace => {
                const image = workspaceImages.find(
                  image => image.workspaceId === workspace.id
                )

                return (
                  <Button
                    key={workspace.id}
                    className="flex items-center justify-start"
                    variant="ghost"
                    onClick={() => handleSelect(workspace.id)}
                  >
                    {image ? (
                      <Image
                        style={{ width: "22px", height: "22px" }}
                        className="mr-2 rounded"
                        src={image.url || ""}
                        width={22}
                        height={22}
                        alt={workspace.name}
                      />
                    ) : (
                      <IconBuilding className="mr-2" size={22} />
                    )}

                    <span className="text-sm font-medium">{workspace.name}</span>
                  </Button>
                )
              })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
