import { Link } from '@tanstack/react-router'
import { HeaderClock } from './HeaderClock'
import { HeaderSearch } from './HeaderSearch'
import { NotificationDropdown } from './NotificationDropdown'
import { UserMenu } from './UserMenu'
import { useCurrentUser } from '#/lib/store/hooks'

export function Header() {
  const user = useCurrentUser()

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="page-wide flex items-center gap-4 py-3">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <span className="relative">
            <img src="/brand/sopremi-logo.png" alt="SOPREMI" className="h-9 w-auto" />
            <span className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(255,130,0,0.18),transparent_60%)] blur-lg" aria-hidden />
          </span>
          <span className="hidden flex-col leading-tight md:flex">
            <span className="text-[9.5px] uppercase tracking-[0.24em] text-[var(--text-muted)]">SOPREMI / Forge</span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--text)]">
              Cockpit opérationnel
            </span>
          </span>
        </Link>

        <span className="hidden h-6 w-px bg-[var(--line)] md:block" />
        <HeaderClock />

        <div className="ml-auto flex items-center gap-2">
          {user && <HeaderSearch />}
          {user && <NotificationDropdown />}
          {user ? (
            <UserMenu />
          ) : (
            <Link to="/login" className="btn btn-primary">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
