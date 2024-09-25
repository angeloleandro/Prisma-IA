import { LLM } from "@/types"

const PERPLEXITY_PLATORM_LINK =
  "https://docs.perplexity.ai/docs/getting-started"

// Sonar Medium Chat (UPDATED 2/25/24)
const PERPLEXITY_SONAR_MEDIUM_CHAT_8x7B: LLM = {
  modelId: "sonar-medium-chat",
  modelName: "Sonar Medium Chat",
  provider: "perplexity",
  hostedId: "sonar-medium-chat",
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false
}

// Sonar Medium Online (UPDATED 2/25/24)
const PERPLEXITY_SONAR_MEDIUM_ONLINE_8x7B: LLM = {
  modelId: "sonar-medium-online",
  modelName: "Sonar Medium Online",
  provider: "perplexity",
  hostedId: "sonar-medium-online",
  platformLink: PERPLEXITY_PLATORM_LINK,
  imageInput: false
}

export const PERPLEXITY_LLM_LIST: LLM[] = [
  PERPLEXITY_SONAR_MEDIUM_CHAT_8x7B,
  PERPLEXITY_SONAR_MEDIUM_ONLINE_8x7B
]
