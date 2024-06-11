import { useQuery } from "@tanstack/react-query"
import { getAttendees } from "../../../api/attendees"
import { queryClient } from "../../../utils/queryClient"

export const getAttendeesKey = "get_attendees"
export function useGetAttendees() {
  const query = useQuery({
    queryKey: [getAttendeesKey],
    queryFn: getAttendees,
  })

  return query
}

export function invalidateAttendeesQueries() {
  return queryClient.invalidateQueries({
    queryKey: [getAttendeesKey],
    refetchType: "all",
  })
}
