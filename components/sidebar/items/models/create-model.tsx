import { SidebarCreateItem } from "@/components/sidebar/items/all/sidebar-create-item"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChatbotUIContext } from "@/context/context"
import { MODEL_NAME_MAX } from "@/db/limits"
import { TablesInsert } from "@/supabase/types"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"

interface CreateModelProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreateModel: FC<CreateModelProps> = ({ isOpen, onOpenChange }) => {
  const { t } = useTranslation()
  const { profile, selectedWorkspace } = useContext(ChatbotUIContext)

  const [isTyping] = useState(false)

  const [apiKey, setApiKey] = useState("")
  const [baseUrl, setBaseUrl] = useState("")
  const [description] = useState("")
  const [modelId, setModelId] = useState("")
  const [name, setName] = useState("")
  const [contextLength, setContextLength] = useState(4096)

  if (!profile || !selectedWorkspace) return null

  return (
    <SidebarCreateItem
      contentType="models"
      isOpen={isOpen}
      isTyping={isTyping}
      onOpenChange={onOpenChange}
      createState={
        {
          user_id: profile.user_id,
          api_key: apiKey,
          base_url: baseUrl,
          description,
          context_length: contextLength,
          model_id: modelId,
          name
        } as TablesInsert<"models">
      }
      renderInputs={() => (
        <>
          <div className="space-y-1.5 text-sm">
            <div>{t("createCustomModel")}</div>

            <div>{t("apiCompatibilityWarning")}</div>
          </div>

          <div className="space-y-1">
            <Label>{t("name")}</Label>

            <Input
              placeholder={t("modelNamePlaceholder")}
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={MODEL_NAME_MAX}
            />
          </div>

          <div className="space-y-1">
            <Label>{t("modelId")}</Label>

            <Input
              placeholder={t("modelIdPlaceholder")}
              value={modelId}
              onChange={e => setModelId(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>{t("baseUrl")}</Label>

            <Input
              placeholder={t("baseUrlPlaceholder")}
              value={baseUrl}
              onChange={e => setBaseUrl(e.target.value)}
            />

            <div className="pt-1 text-xs italic">
              {t("apiCompatibilityNote")}
            </div>
          </div>

          <div className="space-y-1">
            <Label>{t("apiKey")}</Label>

            <Input
              type="password"
              placeholder={t("apiKeyPlaceholder")}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>{t("maxContextLength")}</Label>

            <Input
              type="number"
              placeholder="4096"
              min={0}
              value={contextLength}
              onChange={e => setContextLength(parseInt(e.target.value))}
            />
          </div>
        </>
      )}
    />
  )
}
