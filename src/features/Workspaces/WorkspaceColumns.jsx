import { Button, Drawer, Loader, Menu, ScrollAreaAutosize } from "@mantine/core"
import { useClickOutside, useDisclosure } from "@mantine/hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Pencil, Plus, EllipsisVertical, Trash2 } from "lucide-react"
import {
  deleteWorkspaceColumn,
  editColumnName,
  getWorkspacesTickets,
} from "../../api/workspaces"
import WorkspaceTicket from "./WorkspaceTicket"
import { drawerTitleStyles } from "../../utils/helpers"
import { CreateTicketDrawer } from "./CreateTicketDrawer"
import WarningModal from "../../components/WarningModal"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import EditableTitle from "../../components/EditableTitle"

export default function WorkspaceColumns({ column, workspace, isSuccess }) {
  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const [
    isWarningModalOpen,
    { open: openWarningModal, close: closeWarningModal },
  ] = useDisclosure(false)
  const queryClient = useQueryClient()
  const [isEditMode, setEditMode] = useState(false)

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["get_tickets", workspace.id, column.id],
    queryFn: () => getWorkspacesTickets(workspace.id, column.id),
    enabled: isSuccess,
  })

  const { mutate: deleteColumn, isPending: isPendingDelete } = useMutation({
    mutationFn: () => {
      return deleteWorkspaceColumn(column)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["get_workspaces_columns", workspace.id],
        (oldData) => {
          return oldData.filter((column) => column.id !== data.id)
        }
      )
      closeWarningModal()
    },
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
        column_name: z.string().min(2, {
          message: "Column name should be at least 2 characters",
        }),
      })
    ),
    defaultValues: {
      column_name: column.column_name,
    },
  })
  const columnValue = getValues("column_name")

  const { mutate: editColumnNameMutation } = useMutation({
    mutationFn: () => {
      if (column.column_name === columnValue) {
        setEditMode(false)
        return
      }
      return editColumnName(column, columnValue)
    },
    onSuccess: async (data) => {
      await queryClient.setQueryData(
        ["get_workspaces_columns", workspace.id],
        (oldData) => {
          return oldData.map((item) => {
            return item.id === data.id ? data : item
          })
        }
      )
      setEditMode(false)
    },
  })

  const inputRef = useClickOutside(() => {
    setEditMode(false)
    resetField("column_name")
  })

  return (
    <>
      <div
        key={column.id}
        className="border-2  rounded min-w-80 max-w-80 w-full h-full flex flex-col overflow-y-hidden bg-gray-100 relative"
      >
        <div className="flex items-center justify-between border-b p-2">
          <EditableTitle
            isEditMode={isEditMode}
            titleValue={column.column_name}
            actions={{ ...register("column_name") }}
            onSubmit={handleSubmit(editColumnNameMutation)}
            errorMsg={errors?.column_name?.message}
            inputRef={inputRef}
            fontSize={18}
          />

          <div className="flex items-center gap-2">
            <Menu position="bottom-end">
              <Menu.Target>
                <EllipsisVertical className="cursor-pointer" size={18} />
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
                  color="red"
                  onClick={openWarningModal}
                >
                  <span>Delete column</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>

        <ScrollAreaAutosize
          offsetScrollbars
          scrollbarSize={6}
          scrollHideDelay={500}
          className="pr-0.5"
          h={250}
        >
          <div className="pt-2 pl-2 pr-0.5 flex flex-col gap-2">
            {isLoading ? (
              <div className="mt-4 flex justify-center">
                <Loader
                  size="sm"
                  styles={{
                    root: { "--loader-color": "#0e7490" },
                  }}
                />
              </div>
            ) : (
              tickets?.map((ticket) => (
                <WorkspaceTicket
                  ticket={ticket}
                  workspace={workspace}
                  key={ticket.id}
                />
              ))
            )}
          </div>
        </ScrollAreaAutosize>

        <Button
          radius={0}
          variant="transparent"
          color="#000"
          fullWidth
          onClick={openDrawer}
        >
          <Plus strokeWidth={1.8} />
        </Button>
      </div>

      <Drawer
        opened={isDrawerOpen}
        onClose={closeDrawer}
        title="Create a new ticket"
        size={"33%"}
        position="right"
        classNames={{
          title: drawerTitleStyles,
        }}
      >
        <CreateTicketDrawer
          workspace={workspace}
          column={column}
          close={closeDrawer}
        />
      </Drawer>

      <WarningModal
        content="If you delete this column, 
        every tickets in it will be deleted."
        isOpen={isWarningModalOpen}
        close={closeWarningModal}
        onConfirm={deleteColumn}
        isLoading={isPendingDelete}
      />
    </>
  )
}
