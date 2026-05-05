import { Link } from '@tanstack/react-router'
import { ArrowUpRight, AlertOctagon, ShieldCheck, Truck } from 'lucide-react'
import { useCurrentUser } from '#/lib/store/hooks'
import { useCriticalAlerts, type CriticalAlert } from './useCriticalAlerts'

const ICON: Record<CriticalAlert['kind'], typeof AlertOctagon> = {
  project: AlertOctagon,
  validation: ShieldCheck,
  engin: Truck,
}

const TONE: Record<'danger' | 'warning', string> = {
  danger:
    'border-[rgba(227,85,105,0.32)] bg-[rgba(227,85,105,0.08)] text-[var(--danger-soft)] hover:bg-[rgba(227,85,105,0.14)]',
  warning:
    'border-[rgba(240,164,64,0.30)] bg-[rgba(240,164,64,0.08)] text-[var(--warning-soft)] hover:bg-[rgba(240,164,64,0.14)]',
}

/**
 * Affiché uniquement pour DG et DOM. Aggrège les signaux faibles que la
 * direction doit voir au premier coup d'œil sans creuser.
 */
export function CriticalRibbon() {
  const user = useCurrentUser()
  const alerts = useCriticalAlerts()
  if (!user) return null
  if (user.role !== 'dg' && user.role !== 'dom') return null
  if (alerts.length === 0) return null

  return (
    <section
      role="alert"
      className="flex flex-col gap-2 rounded-xl border border-[rgba(227,85,105,0.22)] bg-[rgba(227,85,105,0.04)] px-5 py-4"
    >
      <header className="flex items-center justify-between gap-3">
        <p className="m-0 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[var(--danger-soft)]">
          <span className="dot dot-pulse text-[var(--danger)]" /> Signaux à traiter
          <span className="font-tech tabular text-[var(--text-muted)]">{alerts.length}</span>
        </p>
        <span className="font-tech text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
          rafraîchi en temps réel
        </span>
      </header>
      <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {alerts.slice(0, 6).map((a) => {
          const Icon = ICON[a.kind]
          return (
            <li key={a.id}>
              <Link
                to={a.to}
                className={`group flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left no-underline transition ${
                  a.tone === 'danger' ? TONE.danger : TONE.warning
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="m-0 truncate text-[12.5px] font-semibold">{a.title}</p>
                  <p className="m-0 truncate text-[11px] opacity-80">{a.detail}</p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-60 transition group-hover:opacity-100" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
