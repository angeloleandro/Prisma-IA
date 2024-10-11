// components/utility/global-state.tsx

"use client";

import { FC, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser-client";
import { ChatbotUIContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/supabase-js";
import { getProfileByUserId } from "@/db/profile";
import { getWorkspacesByUserId } from "@/db/workspaces";
import { getWorkspaceImageFromStorage } from "@/db/storage/workspace-images";
import { convertBlobToBase64 } from "@/lib/blob-to-b64";
import {
  fetchHostedModels,
  fetchOllamaModels,
  fetchOpenRouterModels
} from "@/lib/models/fetch-models";
import { Tables } from "@/supabase/types";
import {
  ChatFile,
  ChatMessage,
  ChatSettings,
  LLM,
  MessageImage,
  OpenRouterLLM,
  WorkspaceImage
} from "@/types";
import { AssistantImage } from "@/types/images/assistant-image";
import { VALID_ENV_KEYS } from "@/types/valid-keys";

interface GlobalStateProps {
  children: React.ReactNode;
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  const router = useRouter();

  // PROFILE STORE
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);

  // Autenticação e sessão
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isProUser, setIsProUser] = useState<boolean>(false);

  // ITEMS STORE
  const [assistants, setAssistants] = useState<Tables<"assistants">[]>([]);
  const [collections, setCollections] = useState<Tables<"collections">[]>([]);
  const [chats, setChats] = useState<Tables<"chats">[]>([]);
  const [files, setFiles] = useState<Tables<"files">[]>([]);
  const [folders, setFolders] = useState<Tables<"folders">[]>([]);
  const [models, setModels] = useState<Tables<"models">[]>([]);
  const [presets, setPresets] = useState<Tables<"presets">[]>([]);
  const [prompts, setPrompts] = useState<Tables<"prompts">[]>([]);
  const [tools, setTools] = useState<Tables<"tools">[]>([]);
  const [workspaces, setWorkspaces] = useState<Tables<"workspaces">[]>([]);
  const [fileItems, setFileItems] = useState<Tables<"file_items">[]>([]);

  // MODELS STORE
  const [envKeyMap, setEnvKeyMap] = useState<Record<string, VALID_ENV_KEYS>>({});
  const [availableHostedModels, setAvailableHostedModels] = useState<LLM[]>([]);
  const [availableLocalModels, setAvailableLocalModels] = useState<LLM[]>([]);
  const [availableOpenRouterModels, setAvailableOpenRouterModels] = useState<
    OpenRouterLLM[]
  >([]);

  // WORKSPACE STORE
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<Tables<"workspaces"> | null>(null);
  const [workspaceImages, setWorkspaceImages] = useState<WorkspaceImage[]>([]);

  // PRESET STORE
  const [selectedPreset, setSelectedPreset] =
    useState<Tables<"presets"> | null>(null);

  // ASSISTANT STORE
  const [selectedAssistant, setSelectedAssistant] =
    useState<Tables<"assistants"> | null>(null);
  const [assistantImages, setAssistantImages] = useState<AssistantImage[]>([]);
  const [openaiAssistants, setOpenaiAssistants] = useState<any[]>([]); // Considere tipar corretamente

  // PASSIVE CHAT STORE
  const [userInput, setUserInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatSettings, setChatSettings] = useState<ChatSettings | null>({
    model: "gpt-4-turbo-preview",
    prompt: "You are a helpful AI assistant.",
    temperature: 0.5,
    contextLength: 4000,
    includeProfileContext: true,
    includeWorkspaceInstructions: true,
    embeddingsProvider: "openai"
  });
  const [selectedChat, setSelectedChat] = useState<Tables<"chats"> | null>(null);
  const [chatFileItems, setChatFileItems] = useState<Tables<"file_items">[]>([]);

  // ACTIVE CHAT STORE
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [firstTokenReceived, setFirstTokenReceived] = useState<boolean>(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // CHAT INPUT COMMAND STORE
  const [isPromptPickerOpen, setIsPromptPickerOpen] = useState(false);
  const [slashCommand, setSlashCommand] = useState("");
  const [isFilePickerOpen, setIsFilePickerOpen] = useState(false);
  const [hashtagCommand, setHashtagCommand] = useState("");
  const [isToolPickerOpen, setIsToolPickerOpen] = useState(false);
  const [toolCommand, setToolCommand] = useState("");
  const [focusPrompt, setFocusPrompt] = useState(false);
  const [focusFile, setFocusFile] = useState(false);
  const [focusTool, setFocusTool] = useState(false);
  const [focusAssistant, setFocusAssistant] = useState(false);
  const [atCommand, setAtCommand] = useState("");
  const [isAssistantPickerOpen, setIsAssistantPickerOpen] = useState(false);

  // ATTACHMENTS STORE
  const [chatFiles, setChatFiles] = useState<ChatFile[]>([]);
  const [chatImages, setChatImages] = useState<MessageImage[]>([]);
  const [newMessageFiles, setNewMessageFiles] = useState<ChatFile[]>([]);
  const [newMessageImages, setNewMessageImages] = useState<MessageImage[]>([]);
  const [showFilesDisplay, setShowFilesDisplay] = useState<boolean>(false);

  // RETRIEVAL STORE
  const [useRetrieval, setUseRetrieval] = useState<boolean>(true);
  const [sourceCount, setSourceCount] = useState<number>(4);

  // TOOL STORE
  const [selectedTools, setSelectedTools] = useState<Tables<"tools">[]>([]);
  const [toolInUse, setToolInUse] = useState<string>("none");

  useEffect(() => {
    (async () => {
      const sessionResponse = await supabase.auth.getSession();
      setSession(sessionResponse.data.session);
      setUser(sessionResponse.data.session?.user || null);

      if (sessionResponse.data.session) {
        const userId = sessionResponse.data.session.user.id;

        const profile = await getProfileByUserId(userId);
        setProfile(profile);

        // Verificar status de assinatura
        setIsProUser(profile?.is_pro || false);

        if (!profile || !profile.has_onboarded) {
          return router.push("/setup");
        }

        const workspaces = await getWorkspacesByUserId(userId);
        setWorkspaces(workspaces || []);

        for (const workspace of workspaces || []) {
          let workspaceImageUrl = "";

          if (workspace.image_path) {
            workspaceImageUrl =
              (await getWorkspaceImageFromStorage(workspace.image_path)) || "";
          }

          if (workspaceImageUrl) {
            try {
              const response = await fetch(workspaceImageUrl);
              if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
              }
              const blob = await response.blob();
              const base64 = await convertBlobToBase64(blob);

              setWorkspaceImages((prev) => [
                ...prev,
                {
                  workspaceId: workspace.id,
                  path: workspace.image_path, // string | null
                  base64: base64,
                  url: workspaceImageUrl
                }
              ]);
            } catch (error) {
              console.error("Erro ao processar a imagem do workspace:", error);
            }
          }
        }

        const hostedModelRes = await fetchHostedModels(profile);
        if (!hostedModelRes) return;

        setEnvKeyMap(hostedModelRes.envKeyMap);
        setAvailableHostedModels(hostedModelRes.hostedModels);

        if (
          profile.openrouter_api_key || // Agora existe
          hostedModelRes.envKeyMap["openrouter"]
        ) {
          const openRouterModels = await fetchOpenRouterModels();
          if (!openRouterModels) return;
          setAvailableOpenRouterModels(openRouterModels);
        }

        if (process.env.NEXT_PUBLIC_OLLAMA_URL) {
          const localModels = await fetchOllamaModels();
          if (!localModels) return;
          setAvailableLocalModels(localModels);
        }
      }
    })();
  }, [router]);

  return (
    <ChatbotUIContext.Provider
      value={{
        // PROFILE STORE
        profile,
        setProfile,

        // Autenticação e sessão
        session,
        setSession,
        user,
        setUser,
        isProUser,
        setIsProUser,

        // ITEMS STORE
        assistants,
        setAssistants,
        collections,
        setCollections,
        chats,
        setChats,
        files,
        setFiles,
        folders,
        setFolders,
        models,
        setModels,
        presets,
        setPresets,
        prompts,
        setPrompts,
        tools,
        setTools,
        workspaces,
        setWorkspaces,
        fileItems,
        setFileItems,

        // MODELS STORE
        envKeyMap,
        setEnvKeyMap,
        availableHostedModels,
        setAvailableHostedModels,
        availableLocalModels,
        setAvailableLocalModels,
        availableOpenRouterModels,
        setAvailableOpenRouterModels,

        // WORKSPACE STORE
        selectedWorkspace,
        setSelectedWorkspace,
        workspaceImages,
        setWorkspaceImages,

        // PRESET STORE
        selectedPreset,
        setSelectedPreset,

        // ASSISTANT STORE
        selectedAssistant,
        setSelectedAssistant,
        assistantImages,
        setAssistantImages,
        openaiAssistants,
        setOpenaiAssistants,

        // PASSIVE CHAT STORE
        userInput,
        setUserInput,
        chatMessages,
        setChatMessages,
        chatSettings,
        setChatSettings,
        selectedChat,
        setSelectedChat,
        chatFileItems,
        setChatFileItems,

        // ACTIVE CHAT STORE
        isGenerating,
        setIsGenerating,
        firstTokenReceived,
        setFirstTokenReceived,
        abortController,
        setAbortController,

        // CHAT INPUT COMMAND STORE
        isPromptPickerOpen,
        setIsPromptPickerOpen,
        slashCommand,
        setSlashCommand,
        isFilePickerOpen,
        setIsFilePickerOpen,
        hashtagCommand,
        setHashtagCommand,
        isToolPickerOpen,
        setIsToolPickerOpen,
        toolCommand,
        setToolCommand,
        focusPrompt,
        setFocusPrompt,
        focusFile,
        setFocusFile,
        focusTool,
        setFocusTool,
        focusAssistant,
        setFocusAssistant,
        atCommand,
        setAtCommand,
        isAssistantPickerOpen,
        setIsAssistantPickerOpen,

        // ATTACHMENTS STORE
        chatFiles,
        setChatFiles,
        chatImages,
        setChatImages,
        newMessageFiles,
        setNewMessageFiles,
        newMessageImages,
        setNewMessageImages,
        showFilesDisplay,
        setShowFilesDisplay,

        // RETRIEVAL STORE
        useRetrieval,
        setUseRetrieval,
        sourceCount,
        setSourceCount,

        // TOOL STORE
        selectedTools,
        setSelectedTools,
        toolInUse,
        setToolInUse
      }}
    >
      {children}
    </ChatbotUIContext.Provider>
  );
};