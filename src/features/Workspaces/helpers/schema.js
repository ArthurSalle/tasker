import { z } from "zod"

export const ticketSchema = z.object({
  ticket_name: z.string().min(2, { message: "Ticket name is required" }),
  ticket_description: z.string().optional(),
  ticket_priority: z.enum(["Low", "Critical", "High"]).nullable(),
  column_id: z.union([z.string(), z.number()]),
})
