import { Card } from "@mantine/core"

export default function WorkspaceTicket({ ticket }) {
  return (
    <>
      <Card padding="sm">
        <span className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r bg-cyan-600"></span>

        <div className="flex flex-col gap-2">
          <span className="text-lg font-medium">{ticket?.ticket_name}</span>
          <span>{ticket?.ticket_description}</span>
        </div>
      </Card>
    </>
  )
}
