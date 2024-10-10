import { SidebarCreateItem } from "@/components/sidebar/items/all/sidebar-create-item"
import { ChatSettingsForm } from "@/components/ui/chat-settings-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChatbotUIContext } from "@/context/context"
import { PRESET_NAME_MAX } from "@/db/limits"
import { TablesInsert } from "@/supabase/types"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"

interface CreatePresetProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreatePreset: FC<CreatePresetProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { t } = useTranslation()
  const { profile, selectedWorkspace } = useContext(ChatbotUIContext)

  const [name, setName] = useState("")
  const [isTyping] = useState(false)
  const [description] = useState("")
  const [presetChatSettings, setPresetChatSettings] = useState({
    model: selectedWorkspace?.default_model,
    prompt: selectedWorkspace?.default_prompt,
    temperature: selectedWorkspace?.default_temperature,
    contextLength: selectedWorkspace?.default_context_length,
    includeProfileContext: selectedWorkspace?.include_profile_context,
    includeWorkspaceInstructions:
      selectedWorkspace?.include_workspace_instructions,
    embeddingsProvider: selectedWorkspace?.embeddings_provider
  })

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <SidebarCreateItem
      contentType="presets"
      isOpen={isOpen}
      isTyping={isTyping}
      onOpenChange={onOpenChange}
      createState={
        {
          user_id: profile.user_id,
          name,
          description,
          include_profile_context: presetChatSettings.includeProfileContext,
          include_workspace_instructions:
            presetChatSettings.includeWorkspaceInstructions,
          context_length: presetChatSettings.contextLength,
          model: presetChatSettings.model,
          prompt: presetChatSettings.prompt,
          temperature: presetChatSettings.temperature,
          embeddings_provider: presetChatSettings.embeddingsProvider
        } as TablesInsert<"presets">
      }
      renderInputs={() => (
        <>
          <div className="space-y-1">
            <Label>{t("name")}</Label>

            <Input
              placeholder={t("presetNamePlaceholder")}
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={PRESET_NAME_MAX}
            />
          </div>

          <ChatSettingsForm
            chatSettings={presetChatSettings as any}
            onChangeChatSettings={setPresetChatSettings}
            useAdvancedDropdown={true}
          />
        </>
      )}
    />
  )
}
