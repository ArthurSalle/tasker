import { useQuery } from "@tanstack/react-query"
import { getAttendeesKey } from "../helpers/helpers"
import { getAttendees } from "../../../api/attendees"
import { queryClient } from "../../../utils/queryClient"

export function useGetAttendees() {
  const query = useQuery({
    queryKey: [getAttendeesKey],
    queryFn: getAttendees,
  })

  return query
}

export function invalidateAttendeesQuery() {
  return queryClient.invalidateQueries({
    queryKey: [getAttendeesKey],
    refetchType: "all",
  })
}
