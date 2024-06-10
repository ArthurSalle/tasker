import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle } from "lucide-react"
import { Pencil } from "lucide-react"
import { getWorkspacesTickets } from "../../api/workspaces"
import WorkspaceTicket from "./WorkspaceTicket"

export default function WorkspaceColumns({ column, workspace, isSuccess }) {
  const [opened, { open, close }] = useDisclosure(false)

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["get_tickets", workspace.id, column.id],
    queryFn: () => getWorkspacesTickets(workspace.id, column.id),
    enabled: isSuccess,
  })

  return (
    <div
      key={column.id}
      className="border-2 border-dashed border-cyan-300 rounded min-w-80 h-full flex flex-col justify-between overflow-y-auto bg-cyan-700 bg-opacity-10"
    >
      <div className="flex items-center justify-between border-b p-2">
        <span className="text-lg font-semibold">{column.column_name}</span>

        <Pencil size={18} className="cursor-pointer" />
      </div>

      <div className="p-2 flex flex-col gap-2">
        {isLoading
          ? "loading"
          : tickets?.map((ticket) => {
              return <WorkspaceTicket ticket={ticket} key={ticket.id} />
            })}
      </div>

      <div className="p-2">
        <Button variant="outline" fullWidth onClick={open}>
          <PlusCircle size={20} className="cursor-pointer" />
        </Button>
      </div>

      <Modal opened={opened} onClose={close} title="Create a new ticket">
        <span>{column.column_name}</span>
        <span>{workspace.name}</span>
      </Modal>
    </div>
  )
}
