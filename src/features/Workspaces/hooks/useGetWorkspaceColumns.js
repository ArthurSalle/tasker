import { useQuery } from "@tanstack/react-query"
import { getWorkspacesColumns } from "../../../api/workspaces"

export const getWorkspaceColumnsKey = "get_workspaces_columns"
export function useGetWorkspaceColumns(worspaceId) {
  const query = useQuery({
    queryKey: [getWorkspaceColumnsKey, worspaceId],
    queryFn: () => getWorkspacesColumns(worspaceId),
  })

  return query
}
