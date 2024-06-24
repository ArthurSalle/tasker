import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, Loader, Menu, ScrollArea } from "@mantine/core"
import {
  createWorkspaceColumn,
  deleteWorkspace,
  editWorkspaceName,
  getWorkspacesColumns,
} from "../../api/workspaces"
import WorkspaceColumns from "./WorkspaceColumns"
import { useState } from "react"
import { Pencil, Trash2, EllipsisVertical, Columns } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { mockDelay } from "../../utils/helpers"
import { useClickOutside, useDisclosure } from "@mantine/hooks"
import WarningModal from "../../components/WarningModal"
import EditableTitle from "../../components/EditableTitle"

export default function WorkspaceCard({ workspace, isSuccess }) {
  const queryClient = useQueryClient()
  const [isEditMode, setEditMode] = useState(false)
  const [
    isWarningModalOpen,
    { open: openWarningModal, close: closeWarningModal },
  ] = useDisclosure(false)

  const {
    data: columns,
    isLoading,
    isSuccess: isColumnSuccess,
  } = useQuery({
    queryKey: ["get_workspaces_columns", workspace.id],
    queryFn: () => {
      return getWorkspacesColumns(workspace.id)
    },
    enabled: isSuccess,
  })

  function handleEdit() {
    setEditMode((prev) => !prev)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    resetField,
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

  const workspaceValue = getValues("workspace_name")

  const { mutate } = useMutation({
    mutationFn: (workspace_name) => {
      if (workspace.workspace_name === workspaceValue) {
        setEditMode(false)
        return
      }
      return editWorkspaceName(workspace, workspace_name)
    },
    onSuccess: async (data) => {
      await queryClient.setQueryData(["get_workspaces"], (oldData) => {
        return oldData.map((item) => {
          return item.id === data.id ? data : item
        })
      })
      setEditMode(false)
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

  const inputRef = useClickOutside(() => {
    setEditMode(false)
    resetField("workspace_name")
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
            <EditableTitle
              isEditMode={isEditMode}
              titleValue={workspace.workspace_name}
              actions={{ ...register("workspace_name") }}
              onSubmit={handleSubmit(mutate)}
              errorMsg={errors?.workspace_name?.message}
              inputRef={inputRef}
              fontSize={20}
            />

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
                  onClick={openWarningModal}
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

      <WarningModal
        content="If you delete your workspace, 
        everything in it will be deleted."
        isOpen={isWarningModalOpen}
        close={closeWarningModal}
        onConfirm={deleteWorkspaceMutation}
        isLoading={isPendingDelete}
      />
    </>
  )
}
