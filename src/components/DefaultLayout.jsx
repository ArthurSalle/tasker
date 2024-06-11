import { useMediaQuery } from "@mantine/hooks"
import { DesktopNavbar, MobileNavbar } from "./Navbar"
import { Outlet } from "react-router-dom"

export function DefaultLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="relative">
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      <Outlet />
    </div>
  )
}
