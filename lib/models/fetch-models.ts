import { Tables } from "@/supabase/types"
import { LLM, LLMID, OpenRouterLLM } from "@/types"
import { toast } from "sonner"
import { LLM_LIST_MAP } from "./llm/llm-list"

export const fetchHostedModels = async (profile: Tables<"profiles">) => {
  try {
    const providers = ["google", "anthropic", "mistral", "groq", "perplexity"]

    if (profile.use_azure_openai) {
      providers.push("azure")
    } else {
      providers.push("openai")
    }

    const response = await fetch("/api/keys")

    if (!response.ok) {
      throw new Error(`Server is not responding.`)
    }

    const data = await response.json()

    let modelsToAdd: LLM[] = []

    for (const provider of providers) {
      let providerKey: keyof typeof profile

      if (provider === "google") {
        providerKey = "google_gemini_api_key"
      } else if (provider === "azure") {
        providerKey = "azure_openai_api_key"
      } else {
        providerKey = `${provider}_api_key` as keyof typeof profile
      }

      if (profile?.[providerKey] || data.isUsingEnvKeyMap[provider]) {
        const models = LLM_LIST_MAP[provider]

        if (Array.isArray(models)) {
          modelsToAdd.push(...models)
        }
      }
    }

    return {
      envKeyMap: data.isUsingEnvKeyMap,
      hostedModels: modelsToAdd
    }
  } catch (error) {
    console.warn("Error fetching hosted models: " + error)
    return {
      envKeyMap: {},
      hostedModels: [] // Retorna um valor válido em caso de erro
    }
  }
}

export const fetchOllamaModels = async () => {
  const enableOllama = process.env.NEXT_PUBLIC_ENABLE_OLLAMA === "true"

  if (!enableOllama) {
    // Ollama está desativado via configuração
    return []
  }

  try {
    const ollamaUrl =
      process.env.NEXT_PUBLIC_OLLAMA_URL || "http://localhost:11434"

    const response = await fetch(`${ollamaUrl}/api/tags`)

    if (!response.ok) {
      throw new Error(`Ollama server is not responding.`)
    }

    const data = await response.json()

    const localModels: LLM[] = data.models.map((model: any) => ({
      modelId: model.name as LLMID,
      modelName: model.name,
      provider: "ollama",
      hostedId: model.name,
      platformLink: "https://ollama.ai/library",
      imageInput: false
    }))

    return localModels
  } catch (error) {
    console.warn("Error fetching Ollama models: " + error)
    toast.error("Error fetching Ollama models: " + error)
    return []
  }
}

export const fetchOpenRouterModels = async () => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models")

    if (!response.ok) {
      throw new Error(`OpenRouter server is not responding.`)
    }

    const { data } = await response.json()

    const allowedOpenRouterModels = ["openai/o1-mini", "openai/o1-preview"]

    const openRouterModels = data
      .filter((model: { id: string }) =>
        allowedOpenRouterModels.includes(model.id)
      )
      .map(
        (model: {
          id: string
          name: string
          context_length: number
        }): OpenRouterLLM => ({
          modelId: model.id as LLMID,
          modelName: model.id,
          provider: "openrouter",
          hostedId: model.name,
          platformLink: "https://openrouter.dev",
          imageInput: false,
          maxContext: model.context_length
        })
      )

    return openRouterModels
  } catch (error) {
    console.error("Error fetching Open Router models: " + error)
    toast.error("Error fetching Open Router models: " + error)
    return []
  }
}
