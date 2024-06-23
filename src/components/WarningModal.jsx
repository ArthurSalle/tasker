import { Button, Modal, Text } from "@mantine/core"
import { warningModalTitleStyles } from "../utils/helpers"
import { TriangleAlert } from "lucide-react"

export default function WarningModal({
  title = "Warning",
  content,
  isOpen,
  close,
  onConfirm,
  isLoading,
}) {
  return (
    <Modal.Root opened={isOpen} onClose={close} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title
            classNames={{
              title: warningModalTitleStyles,
            }}
          >
            <div className="flex items-center gap-2">
              <TriangleAlert strokeWidth={1.8} />
              {title}
            </div>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text fw={500}>{content}</Text>

          <div className="flex items-center gap-2 justify-end mt-4">
            <Button variant="light" color="#000" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={onConfirm}
              loading={isLoading}
            >
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
