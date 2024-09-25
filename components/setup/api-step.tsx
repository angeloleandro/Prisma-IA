import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/button"

interface APIStepProps {
  openaiAPIKey: string
  openaiOrgID: string
  azureOpenaiAPIKey: string
  azureOpenaiEndpoint: string
  azureOpenai35TurboID: string
  azureOpenai45TurboID: string
  azureOpenai45VisionID: string
  azureOpenaiEmbeddingsID: string
  anthropicAPIKey: string
  googleGeminiAPIKey: string
  mistralAPIKey: string
  perplexityAPIKey: string
  openrouterAPIKey: string
  useAzureOpenai: boolean
  onOpenaiAPIKeyChange: (value: string) => void
  onOpenaiOrgIDChange: (value: string) => void
  onAzureOpenaiAPIKeyChange: (value: string) => void
  onAzureOpenaiEndpointChange: (value: string) => void
  onAzureOpenai35TurboIDChange: (value: string) => void
  onAzureOpenai45TurboIDChange: (value: string) => void
  onAzureOpenai45VisionIDChange: (value: string) => void
  onAzureOpenaiEmbeddingsIDChange: (value: string) => void
  onAnthropicAPIKeyChange: (value: string) => void
  onGoogleGeminiAPIKeyChange: (value: string) => void
  onMistralAPIKeyChange: (value: string) => void
  onPerplexityAPIKeyChange: (value: string) => void
  onOpenrouterAPIKeyChange: (value: string) => void
  onUseAzureOpenaiChange: (value: boolean) => void
  groqAPIKey: string
  onGroqAPIKeyChange: (value: string) => void
}

export const APIStep: FC<APIStepProps> = ({
  openaiAPIKey,
  openaiOrgID,
  azureOpenaiAPIKey,
  azureOpenaiEndpoint,
  azureOpenai35TurboID,
  azureOpenai45TurboID,
  azureOpenai45VisionID,
  azureOpenaiEmbeddingsID,
  anthropicAPIKey,
  googleGeminiAPIKey,
  mistralAPIKey,
  perplexityAPIKey,
  openrouterAPIKey,
  useAzureOpenai,
  onOpenaiAPIKeyChange,
  onOpenaiOrgIDChange,
  onAzureOpenaiAPIKeyChange,
  onAzureOpenaiEndpointChange,
  onAzureOpenai35TurboIDChange,
  onAzureOpenai45TurboIDChange,
  onAzureOpenai45VisionIDChange,
  onAzureOpenaiEmbeddingsIDChange,
  onAnthropicAPIKeyChange,
  onGoogleGeminiAPIKeyChange,
  onMistralAPIKeyChange,
  onPerplexityAPIKeyChange,
  onOpenrouterAPIKeyChange,
  onUseAzureOpenaiChange,
  groqAPIKey,
  onGroqAPIKeyChange
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="mt-5 space-y-2">
        <Label className="flex items-center">
          <div>
            {useAzureOpenai ? t("azureOpenaiApiKey") : t("openaiApiKey")}
          </div>

          <Button
            className="ml-3 h-[18px] w-[150px] text-[11px]"
            onClick={() => onUseAzureOpenaiChange(!useAzureOpenai)}
          >
            {useAzureOpenai
              ? t("switchToStandardOpenai")
              : t("switchToAzureOpenai")}
          </Button>
        </Label>

        <Input
          placeholder={
            useAzureOpenai ? t("azureOpenaiApiKey") : t("openaiApiKey")
          }
          type="password"
          value={useAzureOpenai ? azureOpenaiAPIKey : openaiAPIKey}
          onChange={e =>
            useAzureOpenai
              ? onAzureOpenaiAPIKeyChange(e.target.value)
              : onOpenaiAPIKeyChange(e.target.value)
          }
        />
      </div>

      <div className="ml-8 space-y-3">
        {useAzureOpenai ? (
          <>
            <div className="space-y-1">
              <Label>{t("azureOpenaiEndpoint")}</Label>

              <Input
                placeholder={t("azureOpenaiEndpointPlaceholder")}
                type="password"
                value={azureOpenaiEndpoint}
                onChange={e => onAzureOpenaiEndpointChange(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>{t("azureOpenai35TurboID")}</Label>

              <Input
                placeholder={t("azureOpenai35TurboIDPlaceholder")}
                type="password"
                value={azureOpenai35TurboID}
                onChange={e => onAzureOpenai35TurboIDChange(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>{t("azureOpenai45TurboID")}</Label>

              <Input
                placeholder={t("azureOpenai45TurboIDPlaceholder")}
                type="password"
                value={azureOpenai45TurboID}
                onChange={e => onAzureOpenai45TurboIDChange(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>{t("azureOpenai45VisionID")}</Label>

              <Input
                placeholder={t("azureOpenai45VisionIDPlaceholder")}
                type="password"
                value={azureOpenai45VisionID}
                onChange={e => onAzureOpenai45VisionIDChange(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>{t("azureOpenaiEmbeddingsID")}</Label>

              <Input
                placeholder={t("azureOpenaiEmbeddingsIDPlaceholder")}
                type="password"
                value={azureOpenaiEmbeddingsID}
                onChange={e => onAzureOpenaiEmbeddingsIDChange(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-1">
              <Label>{t("openaiOrgID")}</Label>

              <Input
                placeholder={t("openaiOrgIDPlaceholder")}
                type="password"
                value={openaiOrgID}
                onChange={e => onOpenaiOrgIDChange(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <div className="space-y-1">
        <Label>{t("anthropicAPIKey")}</Label>

        <Input
          placeholder={t("anthropicAPIKeyPlaceholder")}
          type="password"
          value={anthropicAPIKey}
          onChange={e => onAnthropicAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>{t("googleGeminiAPIKey")}</Label>

        <Input
          placeholder={t("googleGeminiAPIKeyPlaceholder")}
          type="password"
          value={googleGeminiAPIKey}
          onChange={e => onGoogleGeminiAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>{t("mistralAPIKey")}</Label>

        <Input
          placeholder={t("mistralAPIKeyPlaceholder")}
          type="password"
          value={mistralAPIKey}
          onChange={e => onMistralAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>{t("perplexityAPIKey")}</Label>

        <Input
          placeholder={t("perplexityAPIKeyPlaceholder")}
          type="password"
          value={perplexityAPIKey}
          onChange={e => onPerplexityAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>{t("openRouterApiKey")}</Label>

        <Input
          placeholder={t("openRouterApiKeyPlaceholder")}
          type="password"
          value={openrouterAPIKey}
          onChange={e => onOpenrouterAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>{t("groqAPIKey")}</Label>

        <Input
          placeholder={t("groqAPIKeyPlaceholder")}
          type="password"
          value={groqAPIKey}
          onChange={e => onGroqAPIKeyChange(e.target.value)}
        />
      </div>
    </>
  )
}
