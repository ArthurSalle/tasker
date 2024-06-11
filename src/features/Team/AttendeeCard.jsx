import { Card, CardSection, Image, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import EditAttendeeModal from "./EditAttendeeModal"
import { getFullname } from "./helpers/helpers"
import { Shield } from "lucide-react"
import { capitalizeFirstLetter, getFirstLetter, modalTitleStyles } from "../../utils/helpers"

export default function AttendeeCard({ attendee }) {
  const [isOpen, { open, close }] = useDisclosure(false)

  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        padding=""
        withBorder
        onClick={open}
        className="cursor-pointer transition hover:shadow-lg"
      >
        <CardSection>
          {attendee.avatar ? (
            <Image src={attendee.avatar} alt={getFullname(attendee.firstname, attendee.lastname)} h={160} />
          ) : (
            <span className="h-[160px] flex items-center justify-center bg-cyan-700 opacity-50 text-4xl font-semibold text-white">
              {getFirstLetter(attendee.firstname) + getFirstLetter(attendee.lastname)}
            </span>
          )}
        </CardSection>

        <div className="p-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{getFullname(attendee.firstname, attendee.lastname)}</span>
            {/* <Pen
              size={18}
              strokeWidth={1.8}
              onClick={open}
              className="cursor-pointer"
            /> */}
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <Shield size={14} strokeWidth={1.9} />
            <span className="text-sm text-gray-500">{capitalizeFirstLetter(attendee.permission)}</span>
          </div>
        </div>
      </Card>

      <Modal
        opened={isOpen}
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
