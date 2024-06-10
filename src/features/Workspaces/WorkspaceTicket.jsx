import { Card, ColorSwatch, Drawer, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { drawerTitleStyles } from "../../utils/helpers"
import EditTicketDrawer from "./EditTicketDrawer"
import { getPriorityColor } from "./helpers/helpers"

export default function WorkspaceTicket({ ticket, workspace }) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Card padding="sm" onClick={open} className="cursor-pointer">
        <span className="absolute inset-y-0 left-0 w-2 bg-cyan-600"></span>

        <div className="flex flex-col gap-2">
          <Title className="text-lg font-medium" order={4} lineClamp={1}>
            {ticket?.ticket_name}
          </Title>
          <Text lineClamp={2} size="sm">
            {ticket?.ticket_description}
          </Text>
          {ticket.ticket_priority ? (
            <div className="flex items-center gap-1">
              <ColorSwatch
                color={getPriorityColor(ticket.ticket_priority)}
                size={14}
              />
              <Text size="xs" fs="italic">
                - {ticket?.ticket_priority}
              </Text>
            </div>
          ) : (
            ""
          )}
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
        <EditTicketDrawer ticket={ticket} workspace={workspace} />
      </Drawer>
    </>
  )
}
