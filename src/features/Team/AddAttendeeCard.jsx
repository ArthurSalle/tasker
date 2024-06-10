import { Card, CardSection, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { PlusCircle } from "lucide-react"
import AttendeeModal from "./AddAttendeeModal"
import { modalTitleStyles } from "../../utils/helpers"

export default function AddAttendeeCard() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        className="cursor-pointer"
        onClick={open}
      >
        <CardSection h={160} className="bg-cyan-700 bg-opacity-20">
          <div className="h-full flex items-center justify-center text-cyan-600">
            <PlusCircle size={50} strokeWidth={1.8} />
          </div>
        </CardSection>

        <div className="p-2 text-center">
          <span className="text-lg font-medium">Add a new member</span>
        </div>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title="Add a new member in your Team"
        centered
        classNames={{
          title: modalTitleStyles,
        }}
      >
        <AttendeeModal />
      </Modal>
    </>
  )
}
