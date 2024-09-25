import { LLM } from "@/types"
import { FC } from "react"
import { ModelIcon } from "./model-icon"
import { IconInfoCircle } from "@tabler/icons-react"
import { WithTooltip } from "../ui/with-tooltip"

interface ModelOptionProps {
  model: LLM
  onSelect: () => void
}

export const ModelOption: FC<ModelOptionProps> = ({ model, onSelect }) => {
  // Função para obter o nome de exibição personalizado
  const getDisplayName = (modelName: string) => {
    switch (modelName) {
      case "openai/o1-preview":
        return "o1 - Preview"
      case "openai/o1-mini":
        return "o1 - Mini"
      default:
        return modelName
    }
  }

  return (
    <WithTooltip
      display={
        <div>
          {model.provider !== "ollama" && model.pricing && (
            <div className="space-y-1 text-sm">
              <div>
                <span className="font-semibold">Input Cost:</span>{" "}
                {model.pricing.inputCost} {model.pricing.currency} per{" "}
                {model.pricing.unit}
              </div>
              {model.pricing.outputCost && (
                <div>
                  <span className="font-semibold">Output Cost:</span>{" "}
                  {model.pricing.outputCost} {model.pricing.currency} per{" "}
                  {model.pricing.unit}
                </div>
              )}
            </div>
          )}
        </div>
      }
      side="bottom"
      trigger={
        <div
          className="hover:bg-accent flex w-full cursor-pointer justify-start space-x-3 truncate rounded p-2 hover:opacity-50"
          onClick={onSelect}
        >
          <div className="flex items-center space-x-2">
            <ModelIcon provider={model.provider} width={28} height={28} />
            <div className="text-sm font-semibold">
              {getDisplayName(model.modelName)}
            </div>
          </div>
        </div>
      }
    />
  )
}
