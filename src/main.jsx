import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@mantine/core/styles.css"
import { createTheme, MantineProvider } from "@mantine/core"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"

const theme = createTheme({
  // fontFamily: "Open Sans, sans-serif",
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
)
