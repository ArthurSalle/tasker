import { Button, Group, Input, Select, Text, Textarea } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { getPriorityColor } from "./helpers/helpers"
import { Check } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ticketSchema } from "./helpers/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { mockDelay } from "../../utils/helpers"
import { createTicket } from "../../api/workspaces"

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

export const CreateTicketDrawer = ({ workspace, column, close }) => {
  const queryClient = useQueryClient()
  const { register, control, handleSubmit } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      column_id: column.id,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (ticket) => {
      await mockDelay(500)
      return createTicket({ ...ticket, workspace_id: workspace.id })
    },
    onSuccess() {
      queryClient.invalidateQueries(["get_tickets"])
      close()
    },
  })

  return (
    <form className="flex flex-col gap-8 pt-4" onSubmit={handleSubmit(mutate)}>
      <div className="flex flex-col gap-4">
        <div>
          <Input.Wrapper label="Ticket name">
            <Input placeholder="Name" {...register("ticket_name")} />
          </Input.Wrapper>
        </div>
        <div>
          <Textarea
            label="Text description"
            placeholder="Description"
            autosize
            minRows={2}
            {...register("ticket_description")}
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
                placeholder="Select a priority"
                renderOption={renderSelectOptionPriority}
              />
            )}
          />
        </div>
      </div>

      <div className="self-end flex items-center gap-4">
        <Button variant="light" color="#000" onClick={close}>
          Cancel
        </Button>
        <Button variant="default" type="submit" loading={isPending}>
          Create ticket
        </Button>
      </div>
    </form>
  )
}
