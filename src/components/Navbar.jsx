import { CircleUserRound } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-2xl font-bold">
          Tasker.
        </Link>
      </div>

      <nav className="flex gap-8 items-center">
        <Link to="/teams" className="text-lg font-medium">
          Teams
        </Link>
        <Link to="/workspaces" className="text-lg font-medium">
          Workspaces
        </Link>
        <Link to="/settings" className="text-lg font-medium">
          Settings
        </Link>

        <Link to="/profile">
          <CircleUserRound size={24} strokeWidth={1.75} />
        </Link>
      </nav>
    </div>
  )
}
