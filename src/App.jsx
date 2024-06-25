import { Outlet } from "react-router-dom"
import { DesktopNavbar, MobileNavbar } from "./components/Navbar"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "react-query-devtools"
import { Analytics } from "@vercel/analytics/react"
import { useMediaQuery } from "@mantine/hooks"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { queryClient } from "./utils/queryClient"

TimeAgo.addDefaultLocale(en)

function App() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
        <Outlet />
      </div>

      <ReactQueryDevtools />
      <Analytics debug={false} />
    </QueryClientProvider>
  )
}

export default App
