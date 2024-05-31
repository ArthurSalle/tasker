import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Select } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { schema } from "./helpers/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAttendee, editAttendee } from "../../api/attendees"
import { capitalizeFirstLetter } from "./helpers/helpers"

export default function EditAttendeeModal({ attendee }) {
  const queryClient = useQueryClient()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: capitalizeFirstLetter(attendee.firstname),
      lastname: capitalizeFirstLetter(attendee.lastname),
      email: attendee.email,
      avatar: attendee.avatar,
      permission: attendee.permission,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (editedAttendee) => {
      const finaleAttendee = { ...attendee, ...editedAttendee }
      await editAttendee(finaleAttendee)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_attendees"],
        refetchType: "all",
      })
    },
  })

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await deleteAttendee(attendee)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_attendees"],
        refetchType: "all",
      })
    },
  })

  return (
    <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit(mutate)}>
      <div>
        <label>Firstname</label>
        <Input type="text" {...register("firstname")} />
        <span className="text-xs text-red-500">
          {errors?.firstname?.message}
        </span>
      </div>

      <div>
        <label>Lastname</label>
        <Input type="text" {...register("lastname")} />
        <span className="text-xs text-red-500">
          {errors?.lastname?.message}
        </span>
      </div>

      <div>
        <label>Email</label>
        <Input type="text" {...register("email")} />
      </div>

      <div>
        <label>Avatar URL</label>
        <Input type="text" {...register("avatar")} />
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
              placeholder="Choose a value"
              allowDeselect={false}
            />
          )}
        />
        <span className="text-xs text-red-500">
          {errors?.permission?.message}
        </span>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          className="mt-4 !bg-red-600"
          onClick={mutateDelete}
          loading={isDeleting}
        >
          Delete member
        </Button>
        <Button type="submit" className="mt-4 !bg-cyan-700" loading={isPending}>
          Edit member
        </Button>
      </div>
    </form>
  )
}
