import { ActionIcon, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { PlusCircle } from "lucide-react"
import { Pencil } from "lucide-react"
import WorkspaceTicket from "./WorkspaceTicket"
import { modalTitleStyles } from "../../utils/helpers"
import { useGetTickets } from "./hooks/useGetTickets"

export default function WorkspaceColumns({ column, workspace }) {
  const [isOpen, { open, close }] = useDisclosure(false)

  const { data: tickets, isLoading } = useGetTickets(workspace.id, column.id)

  const filteredTickets = tickets?.filter((ticket) => ticket.column_id === column.id)

  return (
    <div className="border-2 border-dashed border-cyan-300 rounded min-w-80 max-w-80 w-full h-full flex flex-col overflow-y-auto bg-cyan-700 bg-opacity-10 relative">
      <div className="flex items-center justify-between border-b p-2">
        <span className="text-lg font-semibold">{column.column_name}</span>

        <div className="flex items-center gap-2">
          <ActionIcon variant="transparent">
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
              <span className="text-center italic text-gray-400">No ticket found</span>
            ) : (
              filteredTickets.map((ticket) => <WorkspaceTicket ticket={ticket} workspace={workspace} key={ticket.id} />)
            )}
          </>
        )}
      </div>

      {/* <div className="p-2 sticky inset-x-0 bottom-0">
        <Button variant="default" fullWidth onClick={open}>
          <PlusCircle size={20} className="cursor-pointer" />
        </Button>
      </div> */}

      <Modal
        opened={isOpen}
        onClose={close}
        centered
        title="Create a new ticket"
        classNames={{
          title: modalTitleStyles,
        }}
      >
        <span>{column.column_name}</span>
        <span>{workspace.name}</span>
      </Modal>
    </div>
  )
}
