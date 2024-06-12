import { ActionIcon, Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle } from "lucide-react"
import { Pencil } from "lucide-react"
import { getWorkspacesTickets } from "../../api/workspaces"
import WorkspaceTicket from "./WorkspaceTicket"
import { drawerTitleStyles } from "../../utils/helpers"
import { CreateTicketDrawer } from "./CreateTicketDrawer"

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
    <div
      key={column.id}
      className="border-2 border-dashed border-cyan-300 rounded min-w-80 max-w-80 w-full h-full flex flex-col overflow-y-auto bg-cyan-700 bg-opacity-10 relative"
    >
      <div className="flex items-center justify-between border-b p-2">
        <span className="text-lg font-semibold">{column.column_name}</span>

        <div className="flex items-center gap-2">
          <ActionIcon variant="transparent" disabled>
            <Pencil size={18} />
          </ActionIcon>
          <ActionIcon variant="transparent" onClick={open}>
            <PlusCircle size={18} />
          </ActionIcon>
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2">
        {isLoading ? (
          "loading"
        ) : (
          <>
            {filteredTickets.length === 0 ? (
              <span className="text-center italic text-gray-400">
                No ticket found
              </span>
            ) : (
              filteredTickets.map((ticket) => (
                <WorkspaceTicket
                  ticket={ticket}
                  workspace={workspace}
                  key={ticket.id}
                />
              ))
            )}
          </>
        )}
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
    </div>
  )
}
