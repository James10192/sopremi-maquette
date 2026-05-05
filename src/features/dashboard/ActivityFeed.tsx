import { Bell, CheckCircle2, OctagonAlert, TriangleAlert } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useNotifications } from '#/lib/store/hooks'
import { timeAgo } from '#/lib/format'
import type { Notification } from '#/lib/types'

const ICON: Record<Notification['kind'], typeof Bell> = {
  info: Bell,
  success: CheckCircle2,
  warning: TriangleAlert,
  alert: OctagonAlert,
}

const COLOR: Record<Notification['kind'], string> = {
  info: 'text-[var(--info-soft)] border-[rgba(95,168,211,0.3)] bg-[rgba(95,168,211,0.10)]',
  success: 'text-[var(--success-soft)] border-[rgba(78,177,133,0.3)] bg-[rgba(78,177,133,0.10)]',
  warning: 'text-[var(--warning-soft)] border-[rgba(240,164,64,0.3)] bg-[rgba(240,164,64,0.10)]',
  alert: 'text-[var(--danger-soft)] border-[rgba(227,85,105,0.3)] bg-[rgba(227,85,105,0.10)]',
}

export function ActivityFeed() {
  const items = useNotifications().slice(0, 6)
  return (
    <section className="surface rounded-2xl p-6">
      <header className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow m-0">Journal</p>
          <h2 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
            Flux temps réel
          </h2>
        </div>
        <Link to="/notifications" className="btn btn-ghost btn-sm">
          Voir tout <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </header>
      <ul className="stagger-fast flex flex-col gap-2.5">
        {items.map((n) => {
          const Icon = ICON[n.kind]
          return (
            <li key={n.id} className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3.5">
              <span className={`inline-flex shrink-0 items-center justify-center rounded-lg border p-2 ${COLOR[n.kind]}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[13px] font-semibold text-[var(--text)]">{n.title}</p>
                <p className="m-0 mt-0.5 text-[12px] leading-5 text-[var(--text-muted)]">{n.body}</p>
              </div>
              <span className="font-tech tabular shrink-0 text-[11px] text-[var(--text-faint)]">{timeAgo(n.at)}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
