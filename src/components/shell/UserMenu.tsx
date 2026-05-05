import { ChevronDown, LogOut, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '#/components/ui/Avatar'
import { resetStore } from '#/lib/store/AppStore'
import { useCurrentUser, useDispatch } from '#/lib/store/hooks'
import { roleLabel } from '#/lib/labels'

export function UserMenu() {
  const user = useCurrentUser()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-2.5 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.03)] px-2 py-1.5 transition hover:bg-[rgba(255,255,255,0.06)]"
      >
        <Avatar initials={user.initials} size={28} seed={user.id} />
        <div className="hidden text-left sm:block">
          <p className="m-0 text-[12.5px] font-semibold leading-tight text-[var(--text)]">{user.name}</p>
          <p className="m-0 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">{roleLabel(user.role)}</p>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
      </button>

      {open && (
        <div className="surface scale-in absolute right-0 top-full z-40 mt-2 w-64 overflow-hidden rounded-xl">
          <div className="flex items-center gap-3 border-b border-[var(--line)] p-3.5">
            <Avatar initials={user.initials} size={40} seed={user.id} />
            <div className="min-w-0">
              <p className="m-0 truncate text-[13px] font-semibold text-[var(--text)]">{user.name}</p>
              <p className="m-0 truncate text-[11px] text-[var(--text-muted)]">{user.email}</p>
            </div>
          </div>
          <div className="p-1.5">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                resetStore()
              }}
              className="sidebar-link w-full"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Réinitialiser la démo
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                dispatch({ type: 'auth/logout' })
                setOpen(false)
              }}
              className="sidebar-link w-full text-[var(--danger-soft)]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
