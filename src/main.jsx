import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import "@mantine/core/styles.css"
import { createTheme, MantineProvider } from "@mantine/core"

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>
)
