import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Team from "../features/Team/Team"
import Workspaces from "../features/Workspaces"
import Settings from "../features/Settings"
import Profile from "../features/Profile"
import ErrorPage from "../components/ErrorPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/workspaces",
        element: <Workspaces />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
])
