import { Bell, CheckCheck, ChevronRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useNotifications, useUnreadCount } from '#/lib/store/hooks'
import { timeAgo } from '#/lib/format'
import type { Notification } from '#/lib/types'

const KIND_DOT: Record<Notification['kind'], string> = {
  info: 'bg-[var(--info)]',
  success: 'bg-[var(--success)]',
  warning: 'bg-[var(--warning)]',
  alert: 'bg-[var(--danger)]',
}

export function NotificationDropdown() {
  const items = useNotifications().slice(0, 5)
  const unread = useUnreadCount()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative inline-flex items-center justify-center rounded-md border p-2 transition ${
          open
            ? 'border-[rgba(255,130,0,0.42)] bg-[rgba(255,130,0,0.10)] text-[var(--ember-bright)]'
            : 'border-[var(--line)] bg-[rgba(255,255,255,0.025)] text-[var(--text-soft)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text)]'
        }`}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="font-tech tabular absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full border border-[#04070b] bg-[var(--ember)] px-1 text-[9.5px] font-semibold text-black">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="surface scale-in absolute right-0 top-full z-30 mt-2 w-[380px] overflow-hidden rounded-xl">
          <header className="flex items-center justify-between gap-2 border-b border-[var(--line)] px-4 py-3">
            <div>
              <p className="eyebrow-muted m-0">Notifications</p>
              <p className="m-0 mt-0.5 text-[12px] text-[var(--text-muted)]">
                <span className="font-tech tabular text-[var(--ember-bright)]">{unread}</span> non lue{unread > 1 ? 's' : ''} ·
                {' '}
                <span className="font-tech tabular">{items.length}</span> récentes
              </p>
            </div>
            {unread > 0 && (
              <button
                onClick={() => dispatch({ type: 'notification/read-all' })}
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] transition hover:text-[var(--text)]"
              >
                <CheckCheck className="h-3 w-3" />
                Tout lu
              </button>
            )}
          </header>

          <ul className="max-h-[420px] overflow-y-auto">
            {items.map((n) => (
              <li key={n.id} className="border-b border-[var(--line)] last:border-b-0">
                <button
                  type="button"
                  onClick={() => {
                    if (!n.read) dispatch({ type: 'notification/read', id: n.id })
                    if (n.link) window.location.href = n.link
                    setOpen(false)
                  }}
                  className="group flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-[rgba(255,255,255,0.03)]"
                >
                  <span className="mt-1.5 flex shrink-0 items-center">
                    <span className={`h-1.5 w-1.5 rounded-full ${n.read ? 'bg-[var(--text-faint)]' : KIND_DOT[n.kind]}`} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`m-0 text-[13px] ${n.read ? 'font-medium text-[var(--text-soft)]' : 'font-semibold text-[var(--text)]'}`}
                    >
                      {n.title}
                    </p>
                    <p className="m-0 mt-0.5 line-clamp-2 text-[12px] leading-5 text-[var(--text-muted)]">{n.body}</p>
                    <p className="font-tech m-0 mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                      {timeAgo(n.at)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
            {items.length === 0 && (
              <li className="px-4 py-8 text-center text-[12px] text-[var(--text-muted)]">
                Aucune notification.
              </li>
            )}
          </ul>

          <footer className="border-t border-[var(--line)] bg-[rgba(255,255,255,0.02)]">
            <Link
              to="/notifications"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 px-4 py-3 text-[12.5px] font-semibold text-[var(--ember-bright)] no-underline transition hover:bg-[rgba(255,130,0,0.06)]"
            >
              Voir toutes les notifications
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </footer>
        </div>
      )}
    </div>
  )
}
