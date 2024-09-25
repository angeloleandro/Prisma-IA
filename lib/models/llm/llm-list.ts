import { LLM } from "@/types"
import { OPENAI_LLM_LIST } from "./openai-llm-list"
import { ANTHROPIC_LLM_LIST } from "./anthropic-llm-list"
import { GOOGLE_LLM_LIST } from "./google-llm-list"
import { MISTRAL_LLM_LIST } from "./mistral-llm-list"
import { PERPLEXITY_LLM_LIST } from "./perplexity-llm-list"
import { GROQ_LLM_LIST } from "./groq-llm-list"
import { OPENROUTER_LLM_LIST } from "./openrouter-llm-list" // Ajustado

// Função para filtrar os modelos permitidos
const filterLLMs = (llms: LLM[], excludeOpenRouter: boolean = false): LLM[] => {
  const allowedModels = [
    // OpenAILLMID
    "gpt-4o",
    "gpt-4-turbo-preview",
    // AnthropicLLMID
    "claude-3-5-sonnet-20240620",
    "claude-3-opus-20240229",
    // GoogleLLMID
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash",
    // MistralLLMID
    "mistral-large-latest",
    "mistral-medium-latest",
    // GroqLLMID
    "llama3-70b-8192",
    "gemma-7b-it",
    // PerplexityLLMID
    "sonar-medium-chat",
    "sonar-medium-online",
    // OpenRouterLLM
    "openai/o1-preview",
    "openai/o1-mini"
  ]

  let filteredLLMs = llms.filter(llm => allowedModels.includes(llm.modelId))

  if (excludeOpenRouter) {
    filteredLLMs = filteredLLMs.filter(llm => llm.provider !== "openrouter")
  }

  return filteredLLMs
}

export const LLM_LIST: LLM[] = filterLLMs([
  ...OPENAI_LLM_LIST,
  ...ANTHROPIC_LLM_LIST,
  ...GOOGLE_LLM_LIST,
  ...MISTRAL_LLM_LIST,
  ...PERPLEXITY_LLM_LIST,
  ...GROQ_LLM_LIST,
  ...OPENROUTER_LLM_LIST
])

export const LLM_LIST_MAP: Record<string, LLM[]> = {
  openai: filterLLMs(OPENAI_LLM_LIST),
  azure: filterLLMs(OPENAI_LLM_LIST),
  anthropic: filterLLMs(ANTHROPIC_LLM_LIST),
  google: filterLLMs(GOOGLE_LLM_LIST),
  mistral: filterLLMs(MISTRAL_LLM_LIST),
  perplexity: filterLLMs(PERPLEXITY_LLM_LIST),
  groq: filterLLMs(GROQ_LLM_LIST),
  openrouter: filterLLMs(OPENROUTER_LLM_LIST)
}

export const LLM_LIST_EXCLUDE_OPENROUTER: LLM[] = filterLLMs(
  [
    ...OPENAI_LLM_LIST,
    ...ANTHROPIC_LLM_LIST,
    ...GOOGLE_LLM_LIST,
    ...MISTRAL_LLM_LIST,
    ...PERPLEXITY_LLM_LIST,
    ...GROQ_LLM_LIST,
    ...OPENROUTER_LLM_LIST
  ],
  true
)

// Adição da constante CUSTOM_ORDER
export const CUSTOM_ORDER = [
  "gpt-4o",
  "gpt-4-turbo-preview",
  "claude-3-5-sonnet-20240620",
  "claude-3-opus-20240229",
  "gemini-1.5-pro-latest",
  "gemini-1.5-flash",
  "mistral-large-latest",
  "mistral-medium-latest",
  "llama3-70b-8192",
  "gemma-7b-it",
  "sonar-medium-chat",
  "sonar-medium-online",
  "openai/o1-preview",
  "openai/o1-mini"
]
