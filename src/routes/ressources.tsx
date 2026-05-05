import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ressources')({ component: RessourcesLayout })

function RessourcesLayout() {
  return <Outlet />
}
