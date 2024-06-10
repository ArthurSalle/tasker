import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  ColorSwatch,
  Group,
  Input,
  Select,
  Text,
  Textarea,
} from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { ticketSchema } from "./helpers/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTicket } from "../../api/workspaces"
import { mockDelay } from "../../utils/helpers"
import { getPriorityColor } from "./helpers/helpers"
import { Check } from "lucide-react"

export default function EditTicketDrawer({ ticket, workspace }) {
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
      await mockDelay(2000)
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

  const renderSelectOption = ({ option, checked }) => (
    <Group flex={1} gap="xs">
      {checked && <Check className="text-gray-500" size={15} strokeWidth={3} />}
      <ColorSwatch color={getPriorityColor(option.label)} size={16} />
      <Text>{option.label}</Text>
    </Group>
  )

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(mutate)}>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-end block italic text-xs text-gray-500">
            Created by Arthur
          </span>
          <span className="text-end block italic text-xs text-gray-500">
            Created 5 days ago
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
                renderOption={renderSelectOption}
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
              />
            )}
          />
        </div>
      </div>

      <div className="self-end flex items-center gap-4">
        <Button className="!bg-red-600" disabled>
          Delete ticket
        </Button>
        <Button type="submit" loading={isPending}>
          Edit ticket
        </Button>
      </div>
    </form>
  )
}
