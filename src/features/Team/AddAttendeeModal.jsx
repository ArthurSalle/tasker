import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAttendee } from "../../api/attendees"
import { Button, Input, Select } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./helpers/schema"

export default function AttendeeModal() {
  const queryClient = useQueryClient()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const { mutate, isPending } = useMutation({
    mutationFn: async (newAttendee) => {
      const attendee = {
        ...newAttendee,
        is_active: false,
      }

      await postAttendee(attendee)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_attendees"],
        refetchType: "all",
      })
    },
  })

  return (
    <>
      <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit(mutate)}>
        <div>
          <label>Firstname</label>
          <Input type="text" placeholder="John" {...register("firstname")} />
          <span className="text-xs text-red-500">
            {errors?.firstname?.message}
          </span>
        </div>
        <div>
          <label>Lastname</label>
          <Input type="text" placeholder="Doe" {...register("lastname")} />
          <span className="text-xs text-red-500">
            {errors?.lastname?.message}
          </span>
        </div>

        <div>
          <label>Email</label>
          <Input
            type="text"
            placeholder="jdoe@gmail.com"
            {...register("email")}
          />
          <span className="text-xs text-red-500">{errors?.email?.message}</span>
        </div>

        <div>
          <label>Avatar URL</label>
          <Input
            type="text"
            placeholder="https://api.dicebear.com/7.x/notionists/svg?seed=Harley"
            {...register("avatar")}
          />
          <span className="text-sm italic text-gray-400">
            https://api.dicebear.com/7.x/notionists/svg?seed=Harley
          </span>
          <span className="text-xs text-red-500">{errors?.url?.message}</span>
        </div>

        <div>
          <label>Permission</label>
          <Controller
            name="permission"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                data={["Read", "Edit", "Write"]}
                defaultValue={"Read"}
                placeholder="Choose a value"
                allowDeselect={false}
              />
            )}
          />
          <span className="text-xs text-red-500">
            {errors?.permission?.message}
          </span>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-4 !bg-cyan-700"
            loading={isPending}
          >
            Add member
          </Button>
        </div>
      </form>
    </>
  )
}
