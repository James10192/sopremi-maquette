import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projets')({ component: ProjetsLayout })

function ProjetsLayout() {
  return <Outlet />
}
