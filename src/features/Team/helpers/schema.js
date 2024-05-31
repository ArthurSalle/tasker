import { z } from "zod"

export const schema = z.object({
  firstname: z.string().min(2, { message: "Firstname is required" }),
  lastname: z.string().min(2, { message: "Lastname is required" }),
  email: z.union([
    z.string().min(2).email({ message: "Invalid email address" }),
    z.string().refine((val) => val === ""),
  ]),
  avatar: z.union([
    z.string().min(2).url({ message: "Invalid url" }),
    z.string().refine((val) => val === ""),
  ]),
  permission: z.enum(["Read", "Edit", "Write"], {
    message: "Permission is required",
  }),
})
