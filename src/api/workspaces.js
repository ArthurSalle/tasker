import supabase from "../utils/supabase"

export const getWorkspaces = async () => {
  const { data } = await supabase
    .from("workspaces")
    .select()
    .order("created_at", { ascending: true })
  return data
}

export const getWorkspacesColumns = async (workspace_id) => {
  const { data } = await supabase
    .from("workspaces_columns")
    .select()
    .eq("workspace_id", workspace_id)

  return data
}

export const getWorkspacesTickets = async (workspace_id, column_id) => {
  const { data } = await supabase
    .from("tickets")
    .select()
    .match({ workspace_id, column_id })

  return data
}

export const editWorkspaceName = async (workspace, workspace_name) => {
  const { data } = await supabase
    .from("workspaces")
    .update({ ...workspace, ...workspace_name })
    .eq("id", workspace.id)
    .select()
    .single()

  return data
}

export const editTicket = async (edited_ticket) => {
  const { data } = await supabase
    .from("tickets")
    .update(edited_ticket)
    .eq("id", edited_ticket.id)
    .select()
    .single()

  return data
}
