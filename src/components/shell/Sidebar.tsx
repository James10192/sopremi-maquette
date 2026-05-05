import { Link, useLocation } from '@tanstack/react-router'
import { Eye } from 'lucide-react'
import { NAV_GROUPS } from './sidebarLinks'
import { useCurrentUser, usePendingValidations, useUnreadCount } from '#/lib/store/hooks'
import { navVisibility } from '#/lib/permissions'
import { roleLabel } from '#/lib/labels'

function isActive(currentPath: string, to: string, match: 'exact' | 'prefix' = 'prefix') {
  if (match === 'exact') return currentPath === to
  return currentPath === to || currentPath.startsWith(`${to}/`)
}

export function Sidebar() {
  const { pathname } = useLocation()
  const pending = usePendingValidations().length
  const unread = useUnreadCount()
  const user = useCurrentUser()

  return (
    <aside className="hidden lg:block">
      <nav className="surface sticky top-[80px] flex flex-col gap-5 rounded-2xl p-3.5">
        {user && (
          <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,130,0,0.05)] px-3 py-2.5">
            <p className="eyebrow-muted m-0">Rôle actif</p>
            <p className="m-0 mt-1 text-[12.5px] font-semibold text-[var(--text)]">{roleLabel(user.role)}</p>
          </div>
        )}

        {NAV_GROUPS.map((group) => {
          const visibleItems = group.items
            .map((it) => ({ it, vis: navVisibility(user, it.key) }))
            .filter(({ vis }) => vis !== 'hidden')
          if (visibleItems.length === 0) return null

          return (
            <div key={group.title}>
              <p className="eyebrow-muted m-0 mb-2 px-2.5">{group.title}</p>
              <ul className="flex flex-col gap-0.5">
                {visibleItems.map(({ it, vis }) => {
                  const active = isActive(pathname, it.to, it.match)
                  const badge =
                    it.to === '/validation' && pending > 0
                      ? pending
                      : it.to === '/notifications' && unread > 0
                      ? unread
                      : undefined
                  return (
                    <li key={it.to}>
                      <Link to={it.to} className={`sidebar-link ${active ? 'active' : ''}`}>
                        <it.icon className="h-4 w-4" />
                        <span>{it.label}</span>
                        {vis === 'read' && (
                          <span
                            title="Lecture seule pour ce rôle"
                            className="ml-1 inline-flex items-center text-[var(--text-faint)]"
                          >
                            <Eye className="h-3 w-3" />
                          </span>
                        )}
                        {badge != null && (
                          <span className="font-tech tabular ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full border border-[rgba(255,130,0,0.3)] bg-[rgba(255,130,0,0.12)] px-1.5 text-[10px] font-semibold text-[var(--ember-bright)]">
                            {badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        <div className="rule" />
        <div className="px-2.5">
          <p className="eyebrow-muted m-0 mb-2">Système</p>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[var(--text-muted)]">Mock data</span>
            <span className="inline-flex items-center gap-1.5 text-[var(--success-soft)]">
              <span className="dot dot-pulse text-[var(--success)]" /> Stable
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[12px]">
            <span className="text-[var(--text-muted)]">Raccourci</span>
            <span className="font-tech tabular text-[var(--text-soft)]">⌘K · recherche</span>
          </div>
        </div>
      </nav>
    </aside>
  )
}
