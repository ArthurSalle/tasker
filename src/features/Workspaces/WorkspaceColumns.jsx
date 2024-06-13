import { Button, Drawer, Loader, Menu, ScrollAreaAutosize } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { Pencil, Plus } from "lucide-react"
import { getWorkspacesTickets } from "../../api/workspaces"
import WorkspaceTicket from "./WorkspaceTicket"
import { drawerTitleStyles } from "../../utils/helpers"
import { CreateTicketDrawer } from "./CreateTicketDrawer"
import { EllipsisVertical } from "lucide-react"
import { Trash2 } from "lucide-react"

export default function WorkspaceColumns({ column, workspace, isSuccess }) {
  const [opened, { open, close }] = useDisclosure(false)

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["get_tickets", workspace.id, column.id],
    queryFn: () => getWorkspacesTickets(workspace.id, column.id),
    enabled: isSuccess,
  })

  const filteredTickets = tickets?.filter(
    (ticket) => ticket.column_id === column.id
  )

  return (
    <>
      <div
        key={column.id}
        className="border-2 border-dashed border-cyan-300 rounded min-w-80 max-w-80 w-full h-full flex flex-col overflow-y-hidden bg-cyan-700 bg-opacity-10 relative"
      >
        <div className="flex items-center justify-between border-b p-2">
          <span className="text-lg font-semibold">{column.column_name}</span>

          <div className="flex items-center gap-2">
            <Menu position="bottom-end">
              <Menu.Target>
                <EllipsisVertical className="cursor-pointer" size={18} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<Pencil size={16} />}>
                  <span>Edit name</span>
                </Menu.Item>
                <Menu.Item leftSection={<Trash2 size={16} />}>
                  <span>Delete column</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>

        <ScrollAreaAutosize
          offsetScrollbars
          scrollbarSize={6}
          scrollHideDelay={500}
          className="pr-0.5 h-full"
          h={250}
        >
          <div className="pl-2 pr-0.5 flex flex-col gap-2">
            {isLoading ? (
              <div className="mt-4 flex justify-center">
                <Loader
                  size="sm"
                  styles={{
                    root: { "--loader-color": "#0e7490" },
                  }}
                />
              </div>
            ) : (
              filteredTickets?.map((ticket) => (
                <WorkspaceTicket
                  ticket={ticket}
                  workspace={workspace}
                  key={ticket.id}
                />
              ))
            )}
          </div>
        </ScrollAreaAutosize>

        <div>
          <Button radius={0} variant="transparent" fullWidth onClick={open}>
            <Plus strokeWidth={1.8} />
          </Button>
        </div>
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        title="Create a new ticket"
        size={"33%"}
        position="right"
        classNames={{
          title: drawerTitleStyles,
        }}
      >
        <CreateTicketDrawer
          workspace={workspace}
          column={column}
          close={close}
        />
      </Drawer>
    </>
  )
}
