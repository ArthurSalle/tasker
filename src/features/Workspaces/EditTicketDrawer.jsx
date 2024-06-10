import { Button, Input, Select, Textarea } from "@mantine/core"

export default function EditTicketDrawer({ ticket }) {
  return (
    <div className="flex flex-col gap-8">
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
            <Input readOnly value={ticket.ticket_name} />
          </Input.Wrapper>
        </div>
        <div>
          <Textarea
            readOnly
            label="Text description"
            value={ticket.ticket_description}
            autosize
            minRows={2}
          />
        </div>
        <div>
          <Select
            label="Ticket priority"
            value={ticket.ticket_priority}
            placeholder="No priority defined"
          />
        </div>
        <div>
          <Select
            readOnly
            label="Ticket status"
            defaultValue={String(ticket.column_id)}
            data={["1", "2", "3", "4", "5", "6"]}
          />
        </div>
      </div>

      <Button className="!bg-red-600 self-end">Delete ticket</Button>
    </div>
  )
}
