import { Navigate, useLocation } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useCurrentUser } from '#/lib/store/hooks'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'

export function AppShell({ children }: { children: ReactNode }) {
  const user = useCurrentUser()
  const { pathname } = useLocation()

  if (!user) {
    if (pathname === '/login' || pathname === '/about') return <>{children}</>
    return <Navigate to="/login" />
  }

  return (
    <div className="page-wide grid gap-6 py-6 lg:grid-cols-[244px_1fr]">
      <Sidebar />
      <div className="min-w-0">
        <MobileNav />
        {children}
      </div>
    </div>
  )
}
