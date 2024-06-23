import supabase from "../utils/supabase"

export const getWorkspaces = async () => {
  const { data } = await supabase
    .from("workspaces")
    .select()
    .order("created_at", { ascending: false })
  return data
}

export const createWorkspace = async (workspace) => {
  const { data } = await supabase
    .from("workspaces")
    .insert(workspace)
    .select()
    .single()
  return data
}

export const deleteWorkspace = async (workspace_id) => {
  const { data } = await supabase
    .from("workspaces")
    .delete()
    .eq("id", workspace_id)
    .select()
    .single()
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

export const getWorkspacesColumns = async (workspace_id) => {
  const { data } = await supabase
    .from("workspaces_columns")
    .select()
    .eq("workspace_id", workspace_id)
    .order("created_at", { ascending: true })

  return data
}

export const createWorkspaceColumn = async (column) => {
  const { data } = await supabase
    .from("workspaces_columns")
    .insert(column)
    .select()
    .single()
  return data
}

export const editColumnName = async (column, column_name) => {
  const { data } = await supabase
    .from("workspaces_columns")
    .update({ ...column, column_name: column_name })
    .eq("id", column.id)
    .select()
    .single()
  return data
}

export const deleteWorkspaceColumn = async (column) => {
  const { data } = await supabase
    .from("workspaces_columns")
    .delete()
    .eq("id", column.id)
    .select()
    .single()
  return data
}

export const getWorkspacesTickets = async (workspace_id, column_id) => {
  const { data } = await supabase
    .from("tickets")
    .select()
    .match({ workspace_id: workspace_id, column_id: column_id })
    .order("created_at", { ascending: true })

  return data?.filter((ticket) => ticket.column_id === column_id)
}

export const editTicket = async (editedTicket) => {
  const { data } = await supabase
    .from("tickets")
    .update(editedTicket)
    .eq("id", editedTicket.id)
    .select()
    .single()

  return data
}

export const deleteTicket = async (ticketId) => {
  const { data } = await supabase.from("tickets").delete().eq("id", ticketId)

  return data
}

export const createTicket = async (ticket) => {
  const { data } = await supabase
    .from("tickets")
    .insert(ticket)
    .select()
    .single()
  return data
}
