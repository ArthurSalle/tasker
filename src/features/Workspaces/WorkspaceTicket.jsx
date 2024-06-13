import { Card, Drawer, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { drawerTitleStyles } from "../../utils/helpers"
import EditTicketDrawer from "./EditTicketDrawer"
import { getPriorityColor } from "./helpers/helpers"

export default function WorkspaceTicket({ ticket, workspace }) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Card padding="sm" mih={70} onClick={open} className="cursor-pointer">
        <span
          className={`absolute inset-y-0 left-0 w-2 ${getPriorityColor(
            ticket.ticket_priority
          )}`}
        ></span>

        <div className="flex flex-col flex-grow gap-1">
          <Title className="" order={5} lineClamp={1}>
            {ticket?.ticket_name}
          </Title>
          <Text lineClamp={1} size="xs">
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
        <EditTicketDrawer ticket={ticket} workspace={workspace} close={close} />
      </Drawer>
    </>
  )
}
