import AttendeeCard from "./AttendeeCard"
import AddAttendeeCard from "./AddAttendeeCard"
import { Loader } from "@mantine/core"
import { useGetAttendees } from "./hooks/useGetAttendees"

export default function AttendeesSection() {
  const { data, isLoading, isError, isFetching } = useGetAttendees()

  return (
    <>
      {isLoading || isFetching ? (
        <div className="py-8 flex justify-center">
          <Loader
            size="lg"
            styles={{
              root: { "--loader-color": "#0e7490" },
            }}
          />
        </div>
      ) : isError ? (
        "error"
      ) : (
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map((attendee) => {
            return <AttendeeCard attendee={attendee} key={attendee.id} />
          })}
          <AddAttendeeCard />
        </div>
      )}
    </>
  )
}
