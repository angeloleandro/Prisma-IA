import { LLM } from "@/types"

const OPENROUTER_PLATORM_LINK = "https://openrouter.ai/docs/overview"

const OPENROUTER_O1_PREVIEW: LLM = {
  modelId: "openai/o1-preview",
  modelName: "OpenAI o1 Preview",
  provider: "openrouter",
  hostedId: "openai/o1-preview",
  platformLink: OPENROUTER_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 2,
    outputCost: 4
  }
}

const OPENROUTER_O1_MINI: LLM = {
  modelId: "openai/o1-mini",
  modelName: "OpenAI o1 Mini",
  provider: "openrouter",
  hostedId: "openai/o1-mini",
  platformLink: OPENROUTER_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 1,
    outputCost: 3
  }
}

export const OPENROUTER_LLM_LIST: LLM[] = [
  OPENROUTER_O1_PREVIEW,
  OPENROUTER_O1_MINI
]
