import {
  useEngins,
  usePendingValidations,
  useProjects,
  useStaff,
} from '#/lib/store/hooks'
import { formatPercent } from '#/lib/format'

type Tick = { label: string; value: string; tone?: 'up' | 'down' | 'flat' }

function arrow(tone: Tick['tone']) {
  if (tone === 'up') return '▲'
  if (tone === 'down') return '▼'
  return '·'
}

function color(tone: Tick['tone']) {
  if (tone === 'up') return 'text-[var(--success-soft)]'
  if (tone === 'down') return 'text-[var(--danger-soft)]'
  return 'text-[var(--text-muted)]'
}

export function TickerStrip() {
  const projects = useProjects()
  const engins = useEngins()
  const staff = useStaff()
  const pending = usePendingValidations().length

  const avgMargin = projects.reduce((s, p) => s + p.rentability, 0) / Math.max(1, projects.length)
  const fleetAvail = engins.filter((e) => e.state !== 'maintenance' && e.state !== 'panne').length
  const presence = staff.filter((s) => s.presence === 'present' || s.presence === 'mission').length
  const presenceRatio = Math.round((presence / Math.max(1, staff.length)) * 100)

  const ticks: Tick[] = [
    { label: 'Marge', value: formatPercent(avgMargin, true), tone: avgMargin > 12 ? 'up' : 'flat' },
    { label: 'Flotte', value: `${fleetAvail}/${engins.length}`, tone: fleetAvail >= engins.length - 2 ? 'up' : 'down' },
    { label: 'Présence', value: `${presenceRatio}%`, tone: presenceRatio >= 90 ? 'up' : 'flat' },
    { label: 'Validation DG', value: pending.toString(), tone: pending > 3 ? 'down' : 'flat' },
  ]

  return (
    <div className="grid divide-x divide-[var(--line)] border-t border-[var(--line)] sm:grid-cols-4">
      {ticks.map((t) => (
        <div key={t.label} className="flex flex-col gap-0.5 px-5 py-3.5 first:pl-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            {t.label}
          </span>
          <span className="font-tech tabular text-[20px] font-semibold leading-none text-[var(--text)]">
            {t.value}
          </span>
          <span className={`font-tech text-[10.5px] uppercase tracking-[0.18em] ${color(t.tone)}`}>
            {arrow(t.tone)} <span className="text-[var(--text-faint)]">vs J-1</span>
          </span>
        </div>
      ))}
    </div>
  )
}
