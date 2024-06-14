import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Loader } from "@mantine/core"
import {
  createWorkspace,
  createWorkspaceColumn,
  getWorkspaces,
} from "../../api/workspaces"
import WorkspaceCard from "./WorkspaceCard"
import { Plus } from "lucide-react"

export default function Workspaces() {
  const queryClient = useQueryClient()

  const {
    data: workspaces,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["get_workspaces"],
    queryFn: () => getWorkspaces(),
  })

  const newWorkspaceTemplate = {
    workspace_name: "New workspace",
  }

  const { mutate } = useMutation({
    mutationFn: () => {
      return createWorkspace(newWorkspaceTemplate)
    },
    onSuccess: (data) => {
      const newColumn = {
        column_name: "New column",
        workspace_id: data.id,
      }
      createWorkspaceColumn(newColumn)
      queryClient.setQueryData(["get_workspaces"], (oldData) => {
        return [data, ...oldData]
      })
    },
  })

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Manage your workspaces</h2>
        <Button
          rightSection={<Plus size={18} />}
          onClick={mutate}
          variant="default"
        >
          Add a workspace
        </Button>
      </div>

      {isLoading ? (
        <div className="py-8 flex justify-center">
          <Loader
            size="lg"
            styles={{
              root: { "--loader-color": "#0e7490" },
            }}
          />
        </div>
      ) : isError ? (
        "error"
      ) : (
        workspaces?.map((workspace) => (
          <WorkspaceCard
            workspace={workspace}
            isSuccess={isSuccess}
            key={workspace.id}
          />
        ))
      )}
    </div>
  )
}
