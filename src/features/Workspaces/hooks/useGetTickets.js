import { useQuery } from "@tanstack/react-query"
import { getWorkspacesTickets } from "../../../api/workspaces"

export const getTicketsKey = "get_tickets"
export function useGetTickets(workspaceId, columnId) {
  const query = useQuery({
    queryKey: [getTicketsKey, workspaceId, columnId],
    queryFn: () => getWorkspacesTickets(workspaceId, columnId),
  })

  return query
}
