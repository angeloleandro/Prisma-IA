import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

// Função genérica para tratamento de erros
const handleError = (error: any, message = "An error occurred") => {
  console.error(error)
  throw new Error(error?.message || message)
}

// Obtém o workspace principal (home) por ID de usuário
export const getHomeWorkspaceByUserId = async (userId: string) => {
  const { data: homeWorkspace, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", userId)
    .eq("is_home", true)
    .single()

  if (!homeWorkspace || error) {
    handleError(error, "Failed to fetch home workspace")
  }

  // Verifique se homeWorkspace é nulo
  if (homeWorkspace === null) {
    throw new Error("No home workspace found for the user")
  }

  return homeWorkspace.id
}

// Obtém um workspace específico por ID de workspace
export const getWorkspaceById = async (workspaceId: string) => {
  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", workspaceId)
    .single()

  if (!workspace || error) {
    handleError(error, `Workspace not found for ID: ${workspaceId}`)
  }

  return workspace
}

// Obtém todos os workspaces de um usuário por ID de usuário
export const getWorkspacesByUserId = async (userId: string) => {
  const { data: workspaces, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (!workspaces || error) {
    handleError(error, "Failed to fetch workspaces for user")
  }

  return workspaces
}

// Cria um novo workspace
export const createWorkspace = async (
  workspace: TablesInsert<"workspaces">
) => {
  const { data: createdWorkspace, error } = await supabase
    .from("workspaces")
    .insert([workspace])
    .select("*")
    .single()

  if (error) {
    handleError(error, "Failed to create workspace")
  }

  return createdWorkspace
}

// Atualiza um workspace específico por ID
export const updateWorkspace = async (
  workspaceId: string,
  workspace: TablesUpdate<"workspaces">
) => {
  console.log("Updating workspace:", workspaceId, workspace)

  const { data: updatedWorkspace, error } = await supabase
    .from("workspaces")
    .update(workspace)
    .eq("id", workspaceId)
    .select("*")
    .single()

  if (error) {
    handleError(error, "Failed to update workspace")
  }

  console.log("Updated workspace:", updatedWorkspace)
  return updatedWorkspace
}

// Deleta um workspace específico por ID
export const deleteWorkspace = async (workspaceId: string) => {
  const { error } = await supabase
    .from("workspaces")
    .delete()
    .eq("id", workspaceId)

  if (error) {
    handleError(error, "Failed to delete workspace")
  }

  return true
}
