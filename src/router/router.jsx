import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Teams from "../pages/Teams"
import Workspaces from "../pages/Workspaces"
import Settings from "../pages/Settings"
import Profile from "../pages/Profile"
import ErrorBoundary from "../components/ErrorBoundary"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/teams",
        element: <Teams />,
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
