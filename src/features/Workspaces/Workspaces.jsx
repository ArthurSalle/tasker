import { useQuery } from "@tanstack/react-query"
import { Button, Loader } from "@mantine/core"
import { getWorkspaces } from "../../api/workspaces"
import WorkspaceCard from "./WorkspaceCard"
import { Plus } from "lucide-react"

export default function Workspaces() {
  const {
    data: workspaces,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["get_workspaces"],
    queryFn: () => getWorkspaces(),
  })

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Manage your workspaces</h2>
        <Button rightSection={<Plus size={18} />} disabled>
          Add a workspace
        </Button>
      </div>

      {isLoading || isFetching ? (
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
