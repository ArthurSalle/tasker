import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  ActionIcon,
  Button,
  Card,
  Input,
  Loader,
  Menu,
  Modal,
  ScrollArea,
  Text,
} from "@mantine/core"
import {
  createWorkspaceColumn,
  deleteWorkspace,
  editWorkspaceName,
  getWorkspacesColumns,
} from "../../api/workspaces"
import WorkspaceColumns from "./WorkspaceColumns"
import { useState } from "react"
import { Check, Pencil, Trash2, EllipsisVertical, Columns } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  capitalizeFirstLetter,
  mockDelay,
  warningModalTitleStyles,
} from "../../utils/helpers"
import { useDisclosure } from "@mantine/hooks"
import { TriangleAlert } from "lucide-react"

export default function WorkspaceCard({ workspace, isSuccess }) {
  const queryClient = useQueryClient()
  const [editMode, setEditMode] = useState(false)
  const [isOpen, { open, close }] = useDisclosure(false)

  const {
    data: columns,
    isLoading,
    isSuccess: isColumnSuccess,
  } = useQuery({
    queryKey: ["get_workspaces_columns", workspace.id],
    queryFn: () => getWorkspacesColumns(workspace.id),
    enabled: isSuccess,
  })

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

  const { mutate: deleteWorkspaceMutation, isPending: isPendingDelete } =
    useMutation({
      mutationFn: () => {
        return deleteWorkspace(workspace.id)
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["get_workspaces"], (oldData) => {
          return oldData.filter((workspace) => workspace.id !== data.id)
        })
      },
    })

  const newColumnTemplate = {
    column_name: "New column",
    workspace_id: workspace.id,
  }
  const { mutate: createColumn } = useMutation({
    mutationFn: async () => {
      await mockDelay(500)
      return createWorkspaceColumn(newColumnTemplate)
    },
    onSuccess: async (data) => {
      await queryClient.setQueryData(
        ["get_workspaces_columns", workspace.id],
        (oldData) => [...oldData, data]
      )
    },
  })
  return (
    <>
      <div className="py-8 flex flex-col gap-4">
        <Card
          key={workspace.id}
          shadow="sm"
          padding="md"
          radius="sm"
          withBorder
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
                value={capitalizeFirstLetter(workspace.workspace_name)}
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
                <Menu.Label>Column</Menu.Label>
                <Menu.Item
                  leftSection={<Columns size={16} />}
                  onClick={createColumn}
                >
                  Add column
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Workspace</Menu.Label>
                <Menu.Item
                  leftSection={<Pencil size={16} />}
                  onClick={handleEdit}
                >
                  <span>Edit name</span>
                </Menu.Item>
                <Menu.Item
                  leftSection={<Trash2 size={16} />}
                  color="red"
                  onClick={open}
                >
                  <span>Delete workspace</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

          <div className={isLoading ? "flex justify-center" : ""}>
            {isLoading ? (
              <Loader
                size="sm"
                styles={{
                  root: { "--loader-color": "#0e7490" },
                }}
              />
            ) : (
              <ScrollArea
                scrollbars="x"
                offsetScrollbars
                scrollbarSize={6}
                scrollHideDelay={500}
              >
                <div className="flex gap-4 p-2 overflow-x-auto">
                  {columns?.map((column) => {
                    return (
                      <WorkspaceColumns
                        column={column}
                        key={column.id}
                        workspace={workspace}
                        isSuccess={isColumnSuccess}
                      />
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </Card>
      </div>

      <Modal.Root opened={isOpen} onClose={close} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title
              classNames={{
                title: warningModalTitleStyles,
              }}
            >
              <div className="flex items-center gap-2">
                <TriangleAlert strokeWidth={1.8} />
                Warning
              </div>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Text fw={500}>
              If you delete your workspace, everything in it will be deleted.
            </Text>

            <div className="flex items-center gap-2 justify-end mt-4">
              <Button variant="light" color="#000" onClick={close}>
                Cancel
              </Button>
              <Button
                variant="outline"
                color="red"
                onClick={deleteWorkspaceMutation}
                loading={isPendingDelete}
              >
                Confirm
              </Button>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
