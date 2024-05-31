import { CircleUserRound } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <NavLink to="/" className="text-2xl font-bold text-cyan-700">
          Tasker.
        </NavLink>
      </div>

      <nav className="flex gap-8 items-center">
        <NavLink
          to="/team"
          className={({ isActive }) =>
            `text-lg font-semibold ${
              isActive ? "text-cyan-700 underline underline-offset-4" : ""
            }`
          }
        >
          Teams
        </NavLink>

        <NavLink
          to="/workspaces"
          className={({ isActive }) =>
            `text-lg font-semibold ${
              isActive ? "text-cyan-700 underline underline-offset-4" : ""
            }`
          }
        >
          Workspaces
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `text-lg font-semibold ${
              isActive ? "text-cyan-700 underline underline-offset-4" : ""
            }`
          }
        >
          Settings
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `${isActive ? "text-cyan-700" : ""}`}
        >
          <CircleUserRound size={24} strokeWidth={1.75} />
        </NavLink>
      </nav>
    </div>
  )
}
