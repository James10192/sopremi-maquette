import { Bell, CheckCircle2, OctagonAlert, TriangleAlert } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useDispatch } from '#/lib/store/hooks'
import { timeAgo } from '#/lib/format'
import type { Notification } from '#/lib/types'

const ICON: Record<Notification['kind'], typeof Bell> = {
  info: Bell,
  success: CheckCircle2,
  warning: TriangleAlert,
  alert: OctagonAlert,
}

const COLOR: Record<Notification['kind'], string> = {
  info: 'text-[var(--info-soft)] border-[rgba(95,168,211,0.30)] bg-[rgba(95,168,211,0.10)]',
  success: 'text-[var(--success-soft)] border-[rgba(78,177,133,0.30)] bg-[rgba(78,177,133,0.10)]',
  warning: 'text-[var(--warning-soft)] border-[rgba(240,164,64,0.30)] bg-[rgba(240,164,64,0.10)]',
  alert: 'text-[var(--danger-soft)] border-[rgba(227,85,105,0.30)] bg-[rgba(227,85,105,0.10)]',
}

export function NotificationItem({ n }: { n: Notification }) {
  const dispatch = useDispatch()
  const Icon = ICON[n.kind]

  const Wrapper: any = n.link ? Link : 'div'
  const wrapperProps = n.link ? { to: n.link } : {}

  return (
    <Wrapper
      {...wrapperProps}
      onClick={() => !n.read && dispatch({ type: 'notification/read', id: n.id })}
      className={`group block rounded-xl border p-4 no-underline transition hover:bg-[rgba(255,255,255,0.04)] ${
        n.read ? 'border-[var(--line)] bg-[rgba(255,255,255,0.025)]' : 'border-[rgba(255,130,0,0.22)] bg-[rgba(255,130,0,0.06)]'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className={`shrink-0 rounded-lg border p-2 ${COLOR[n.kind]}`}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="m-0 text-[13.5px] font-semibold text-[var(--text)]">{n.title}</p>
            {!n.read && <span className="dot text-[var(--ember)]" aria-label="non lue" />}
          </div>
          <p className="m-0 mt-1 text-[12.5px] leading-6 text-[var(--text-muted)]">{n.body}</p>
          <p className="font-tech m-0 mt-1.5 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
            {timeAgo(n.at)}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}
