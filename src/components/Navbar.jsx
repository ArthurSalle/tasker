import { ActionIcon, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { X } from "lucide-react"
import { Menu } from "lucide-react"
import { CircleUserRound } from "lucide-react"
import { NavLink } from "react-router-dom"

export function DesktopNavbar() {
  return (
    <nav className="p-4 flex justify-between items-center">
      <div>
        <NavLink to="/" className="text-2xl font-bold text-cyan-700">
          Tasker.
        </NavLink>
      </div>

      <div className="flex gap-8 items-center">
        <NavLink
          to="/team"
          className={({ isActive }) =>
            `text-lg font-semibold ${
              isActive ? "text-cyan-700 underline underline-offset-4" : ""
            }`
          }
        >
          Team
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
      </div>
    </nav>
  )
}

export function MobileNavbar() {
  const [opened, { open, close }] = useDisclosure()

  return (
    <>
      <nav className="p-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-cyan-700">
          Tasker.
        </NavLink>

        <ActionIcon variant="transparent" onClick={open}>
          <Menu className="text-cyan-700" size={28} />
        </ActionIcon>
      </nav>

      {/* <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        fullScreen
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "linear",
        }}
        radius={0}
      > */}
      <Modal.Root
        opened={opened}
        withCloseButton={false}
        fullScreen
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "linear",
        }}
        radius={0}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Body className="h-full">
            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                onClick={close}
                className="text-2xl font-bold text-cyan-700"
              >
                Tasker.
              </NavLink>
              <ActionIcon variant="transparent" onClick={close}>
                <X className="text-cyan-700" size={28} />
              </ActionIcon>
            </div>

            <ul className="flex flex-col justify-center gap-12 h-[calc(100%-32px)] px-8">
              <li>
                <NavLink
                  to="/team"
                  onClick={close}
                  className={({ isActive }) =>
                    `text-xl font-semibold ${
                      isActive
                        ? "text-cyan-700 underline underline-offset-4"
                        : ""
                    }`
                  }
                >
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/workspaces"
                  onClick={close}
                  className={({ isActive }) =>
                    `text-xl font-semibold ${
                      isActive
                        ? "text-cyan-700 underline underline-offset-4"
                        : ""
                    }`
                  }
                >
                  Workspaces
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  onClick={close}
                  className={({ isActive }) =>
                    `text-xl font-semibold ${
                      isActive
                        ? "text-cyan-700 underline underline-offset-4"
                        : ""
                    }`
                  }
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  onClick={close}
                  className={({ isActive }) =>
                    `text-xl font-semibold ${
                      isActive
                        ? "text-cyan-700 underline underline-offset-4"
                        : ""
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {/* </Modal> */}
    </>
  )
}
