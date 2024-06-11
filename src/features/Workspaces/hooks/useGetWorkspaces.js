import { useQuery } from "@tanstack/react-query"
import { getWorkspaces } from "../../../api/workspaces"

export const getWorkspacesKeys = "get_workspaces"
export function useGetWorkspaces() {
  const query = useQuery({
    queryKey: [getWorkspacesKeys],
    queryFn: getWorkspaces,
  })

  return query
}
