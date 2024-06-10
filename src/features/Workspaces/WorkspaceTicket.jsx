import { Card, Drawer, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { drawerTitleStyles } from "../../utils/helpers"
import EditTicketDrawer from "./EditTicketDrawer"

export default function WorkspaceTicket({ ticket }) {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Card padding="sm" onClick={open} className="cursor-pointer">
        <span className="absolute inset-y-0 left-0 w-2 bg-cyan-600"></span>

        <div className="flex flex-col gap-2">
          <span className="text-lg font-medium">{ticket?.ticket_name}</span>
          <Text lineClamp={2} size="sm">
            {ticket?.ticket_description}
          </Text>
        </div>
      </Card>

      <Drawer
        opened={opened}
        onClose={close}
        title={ticket.ticket_name}
        position="right"
        size={"33%"}
        classNames={{
          title: drawerTitleStyles,
        }}
      >
        <EditTicketDrawer ticket={ticket} />
      </Drawer>
    </>
  )
}
