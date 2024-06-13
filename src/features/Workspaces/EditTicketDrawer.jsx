import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, Input, Select, Text, Textarea } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { ticketSchema } from "./helpers/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTicket, editTicket } from "../../api/workspaces"
import { formatCreationDate, mockDelay } from "../../utils/helpers"
import { getPriorityColor } from "./helpers/helpers"
import { Check } from "lucide-react"

const renderSelectOptionPriority = ({ option, checked }) => (
  <Group flex={1} gap="xs">
    <span
      className={`h-4 w-4 rounded-full ${getPriorityColor(option.label)}`}
    ></span>
    <Text>{option.label}</Text>
    {checked && (
      <Check className="text-gray-400 ms-auto" size={16} strokeWidth={3} />
    )}
  </Group>
)

const renderSelectOptionStatus = ({ option, checked }) => (
  <Group flex={1} gap="xs">
    <Text>{option.label}</Text>
    {checked && (
      <Check className="text-gray-400 ms-auto" size={16} strokeWidth={3} />
    )}
  </Group>
)

export default function EditTicketDrawer({ ticket, workspace, close }) {
  const queryClient = useQueryClient()
  const columns = queryClient.getQueryData([
    "get_workspaces_columns",
    workspace.id,
  ])

  const formattedColumns = columns.map((col) => {
    return {
      value: col.id.toString(),
      label: col.column_name,
    }
  })

  const { register, control, handleSubmit } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      ticket_name: ticket.ticket_name,
      ticket_description: ticket.ticket_description,
      ticket_priority: ticket.ticket_priority,
      column_id: formattedColumns.filter(
        (col) => col.value === ticket.column_id.toString()
      )[0]?.value,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (editedTicket) => {
      await mockDelay(1000)
      const formattedColumnId = { column_id: Number(editedTicket.column_id) }
      const finalTicket = {
        ...ticket,
        ...editedTicket,
        ...formattedColumnId,
      }
      return editTicket(finalTicket)
    },
    onSuccess() {
      queryClient.invalidateQueries(["get_tickets"])
      close()
    },
  })

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await mockDelay(500)
      return deleteTicket(ticket.id)
    },
    onSuccess() {
      queryClient.invalidateQueries(["get_tickets"])
      close()
    },
  })

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(mutate)}>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-end block italic text-xs text-gray-500">
            Created {formatCreationDate(ticket.created_at)}
          </span>
        </div>

        <div>
          <Input.Wrapper label="Ticket name">
            <Input
              defaultValue={ticket.ticket_name}
              {...register("ticket_name")}
            />
          </Input.Wrapper>
        </div>

        <div>
          <Textarea
            label="Text description"
            defaultValue={ticket.ticket_description}
            {...register("ticket_description")}
            autosize
            minRows={2}
          />
        </div>

        <div>
          <Controller
            name="ticket_priority"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Ticket priority"
                data={["Low", "Critical", "High"]}
                placeholder="No priority defined"
                renderOption={renderSelectOptionPriority}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="column_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Ticket status"
                data={formattedColumns}
                allowDeselect={false}
                renderOption={renderSelectOptionStatus}
              />
            )}
          />
        </div>
      </div>

      <div className="self-end flex items-center gap-4">
        <Button
          variant="light"
          color="red"
          onClick={deleteMutation}
          loading={isDeleting}
        >
          Delete ticket
        </Button>
        <Button type="submit" variant="default" loading={isPending}>
          Edit ticket
        </Button>
      </div>
    </form>
  )
}
