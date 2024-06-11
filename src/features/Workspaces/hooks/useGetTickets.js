import { useQuery } from "@tanstack/react-query"
import { getWorkspacesTickets } from "../../../api/workspaces"
import { queryClient } from "../../../utils/queryClient"

export const getTicketsKey = "get_tickets"
export function useGetTickets(workspaceId, columnId) {
  const query = useQuery({
    queryKey: [getTicketsKey, workspaceId, columnId],
    queryFn: () => getWorkspacesTickets(workspaceId, columnId),
  })

  return query
}
export function invalidateTicketsQueries(workspaceId, columnId) {
  return queryClient.invalidateQueries([getTicketsKey, workspaceId, columnId])
}
