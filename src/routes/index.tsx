import { createFileRoute } from '@tanstack/react-router'
import { MockDashboard } from '#/components/MockDashboard'

export const Route = createFileRoute('/')({ component: MockDashboard })
