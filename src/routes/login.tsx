import { createFileRoute } from '@tanstack/react-router'
import { LoginAside } from '#/features/login/Aside'
import { LoginCard } from '#/features/login/LoginCard'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  return (
    <main className="page-wide grid items-stretch gap-6 py-8 lg:grid-cols-[1fr_minmax(420px,520px)]">
      <div className="hidden lg:block">
        <LoginAside />
      </div>
      <div className="flex items-center">
        <LoginCard />
      </div>
    </main>
  )
}
