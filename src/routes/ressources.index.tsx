import { Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ressources/')({
  component: () => <Navigate to="/ressources/engins" />,
})
