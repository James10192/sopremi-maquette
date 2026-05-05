import { Link, useLocation } from '@tanstack/react-router'
import { NAV_GROUPS } from './sidebarLinks'
import { usePendingValidations, useUnreadCount } from '#/lib/store/hooks'

function isActive(currentPath: string, to: string, match: 'exact' | 'prefix' = 'prefix') {
  if (match === 'exact') return currentPath === to
  return currentPath === to || currentPath.startsWith(`${to}/`)
}

export function MobileNav() {
  const { pathname } = useLocation()
  const pending = usePendingValidations().length
  const unread = useUnreadCount()
  const items = NAV_GROUPS.flatMap((g) => g.items)

  return (
    <nav className="scroll-fade-x no-scrollbar -mx-2 mb-4 flex gap-2 overflow-x-auto px-2 lg:hidden">
      {items.map((it) => {
        const active = isActive(pathname, it.to, it.match)
        const badge =
          it.to === '/validation' && pending > 0
            ? pending
            : it.to === '/notifications' && unread > 0
            ? unread
            : undefined
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition ${
              active
                ? 'border-[rgba(255,130,0,0.4)] bg-[rgba(255,130,0,0.14)] text-[#ffd19a]'
                : 'border-[var(--line)] bg-[rgba(255,255,255,0.03)] text-[var(--text-soft)] hover:bg-[rgba(255,255,255,0.06)]'
            }`}
          >
            <it.icon className="h-3.5 w-3.5" />
            {it.label}
            {badge != null && (
              <span className="font-tech tabular text-[10px] text-[var(--ember-bright)]">{badge}</span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
