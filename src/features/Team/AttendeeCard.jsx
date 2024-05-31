import { Card, CardSection, Image, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Pen } from "lucide-react"
import EditAttendeeModal from "./EditAttendeeModal"
import {
  getFirstLetter,
  getFullname,
  modalTitleStyles,
} from "./helpers/helpers"

export default function AttendeeCard({ attendee }) {
  const [opened, { open, close }] = useDisclosure()

  return (
    <>
      <Card shadow="sm" padding="" radius="md" withBorder>
        <CardSection>
          {attendee.avatar ? (
            <Image
              src={attendee.avatar}
              alt={getFullname(attendee.firstname, attendee.lastname)}
              h={160}
            />
          ) : (
            <span className="h-[160px] flex items-center justify-center bg-slate-300 text-4xl font-semibold text-white">
              {getFirstLetter(attendee.firstname) +
                getFirstLetter(attendee.lastname)}
            </span>
          )}
        </CardSection>

        <div className="flex items-center justify-between p-2">
          <span className="text-lg font-medium">
            {getFullname(attendee.firstname, attendee.lastname)}
          </span>
          <Pen
            size={18}
            strokeWidth={1.75}
            onClick={open}
            className="cursor-pointer"
          />
        </div>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title="Edit member"
        centered
        classNames={{
          title: modalTitleStyles,
        }}
      >
        <EditAttendeeModal attendee={attendee} />
      </Modal>
    </>
  )
}
