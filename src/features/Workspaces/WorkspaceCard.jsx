import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ActionIcon, Card, Input, Menu, ScrollArea } from "@mantine/core"
import { EllipsisVertical } from "lucide-react"
import { Trash2 } from "lucide-react"
import { editWorkspaceName, getWorkspacesColumns } from "../../api/workspaces"
import WorkspaceColumns from "./WorkspaceColumns"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CirclePlus } from "lucide-react"

export default function WorkspaceCard({ workspace, isSuccess }) {
  const queryClient = useQueryClient()

  const {
    data: columns,
    isLoading,
    isSuccess: isColumnSuccess,
  } = useQuery({
    queryKey: ["get_workspaces_columns", workspace.id],
    queryFn: () => getWorkspacesColumns(workspace.id),
    enabled: isSuccess,
  })

  const [editMode, setEditMode] = useState(false)

  function handleEdit() {
    setEditMode((prev) => !prev)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        workspace_name: z.string().min(2, {
          message: "Workspace name should be at least 2 characters",
        }),
      })
    ),
    defaultValues: {
      workspace_name: workspace.workspace_name,
    },
  })

  const { mutate } = useMutation({
    mutationFn: (workspace_name) => {
      return editWorkspaceName(workspace, workspace_name)
    },
    onSuccess: async (data) => {
      await queryClient.setQueryData(["get_workspaces"], (oldData) => {
        return oldData.map((item) => {
          return item.id === data.id ? data : item
        })
      })
      handleEdit()
    },
  })

  return (
    <div className="py-8 flex flex-col gap-4">
      <Card
        key={workspace.id}
        shadow="sm"
        padding="md"
        radius="sm"
        withBorder
        h={450}
      >
        <div className="flex items-center justify-between">
          {editMode ? (
            <form
              onSubmit={handleSubmit(mutate)}
              className="flex items-center gap-2"
            >
              <div>
                <Input
                  type="text"
                  variant="unstyled"
                  className="border-b font-semibold p-0"
                  defaultValue={workspace}
                  autoFocus
                  styles={{
                    wrapper: { "--input-fz": "20px" },
                  }}
                  {...register("workspace_name")}
                />
                <span className="text-xs text-red-500">
                  {errors?.workspace_name?.message}
                </span>
              </div>

              <ActionIcon type="submit">
                <Check size={18} />
              </ActionIcon>
            </form>
          ) : (
            <Input
              readOnly
              className="font-semibold border-b border-transparent"
              value={workspace.workspace_name}
              variant="unstyled"
              styles={{
                wrapper: { "--input-fz": "20px" },
              }}
            />
          )}

          <Menu position="bottom-end">
            <Menu.Target>
              <EllipsisVertical className="cursor-pointer" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<Pencil size={16} />}
                onClick={handleEdit}
              >
                <span>Edit name</span>
              </Menu.Item>
              <Menu.Item
                leftSection={<Trash2 size={16} />}
                onClick={() => console.log(workspace)}
              >
                <span>Delete workspace</span>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <ScrollArea
          scrollbars="x"
          offsetScrollbars
          scrollbarSize={6}
          scrollHideDelay={500}
        >
          <div className="flex gap-4 p-2 h-full overflow-x-auto">
            {isLoading
              ? "loading"
              : columns?.map((column) => {
                  return (
                    <WorkspaceColumns
                      column={column}
                      key={column.id}
                      workspace={workspace}
                      isSuccess={isColumnSuccess}
                    />
                  )
                })}

            <div className="p-3 flex items-center border-2 border-dashed border-cyan-300 rounded bg-cyan-700 bg-opacity-10 cursor-pointer">
              <ActionIcon variant="transparent" disabled>
                <CirclePlus size={30} strokeWidth={1.8} />
              </ActionIcon>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}
