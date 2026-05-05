import type { LucideIcon } from 'lucide-react'
import type { Tone } from '#/lib/types'
import { Sparkline } from './Sparkline'

const TONE_STROKE: Record<Tone, string> = {
  success: 'var(--success-soft)',
  warning: 'var(--warning-soft)',
  danger: 'var(--danger-soft)',
  info: 'var(--info-soft)',
  ember: 'var(--ember-bright)',
  sea: '#85e5ea',
  gold: 'var(--gold-soft)',
  muted: 'var(--text-muted)',
}

const TONE_FILL: Record<Tone, string> = {
  success: 'rgba(78, 177, 133, 0.16)',
  warning: 'rgba(240, 164, 64, 0.16)',
  danger: 'rgba(227, 85, 105, 0.16)',
  info: 'rgba(95, 168, 211, 0.16)',
  ember: 'rgba(255, 130, 0, 0.16)',
  sea: 'rgba(29, 177, 187, 0.16)',
  gold: 'rgba(212, 165, 66, 0.16)',
  muted: 'rgba(255, 255, 255, 0.06)',
}

const TONE_TEXT: Record<Tone, string> = {
  success: 'text-[var(--success-soft)]',
  warning: 'text-[var(--warning-soft)]',
  danger: 'text-[var(--danger-soft)]',
  info: 'text-[var(--info-soft)]',
  ember: 'text-[var(--ember-bright)]',
  sea: 'text-[#85e5ea]',
  gold: 'text-[var(--gold-soft)]',
  muted: 'text-[var(--text-muted)]',
}

type Props = {
  label: string
  value: string
  detail?: string
  icon: LucideIcon
  tone?: Tone
  trend?: number[]
}

function delta(trend?: number[]): { sign: '▲' | '▼' | '·'; mag: string; tone: Tone } {
  if (!trend || trend.length < 2) return { sign: '·', mag: '', tone: 'muted' }
  const last = trend[trend.length - 1]
  const prev = trend[trend.length - 2]
  if (last === prev) return { sign: '·', mag: '0', tone: 'muted' }
  const diff = last - prev
  const pct = prev !== 0 ? (Math.abs(diff) / Math.abs(prev)) * 100 : 0
  return diff > 0
    ? { sign: '▲', mag: pct >= 1 ? `${pct.toFixed(1)}%` : `+${diff}`, tone: 'success' }
    : { sign: '▼', mag: pct >= 1 ? `${pct.toFixed(1)}%` : `${diff}`, tone: 'danger' }
}

export function KpiCard({ label, value, detail, icon: Icon, tone = 'ember', trend }: Props) {
  const d = delta(trend)
  return (
    <article className="group surface-soft relative flex flex-col rounded-xl">
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
          {label}
        </span>
        <Icon className={`h-3.5 w-3.5 ${TONE_TEXT[tone]} opacity-70`} />
      </div>

      <div className="flex items-baseline gap-3 px-4 pb-1 pt-2">
        <span className="font-tech tabular text-[2.4rem] font-semibold leading-none tracking-[-0.02em] text-[var(--text)]">
          {value}
        </span>
        {trend && (
          <span className={`font-tech tabular inline-flex items-baseline gap-0.5 text-[11px] font-semibold ${TONE_TEXT[d.tone]}`}>
            {d.sign}
            <span>{d.mag}</span>
          </span>
        )}
      </div>

      {detail && (
        <p className="m-0 px-4 pb-3 text-[11.5px] leading-5 text-[var(--text-muted)]">{detail}</p>
      )}

      {trend && (
        <div className="mt-auto block">
          <Sparkline
            data={trend}
            width={320}
            height={36}
            stroke={TONE_STROKE[tone]}
            fill={TONE_FILL[tone]}
            strokeWidth={1.4}
            responsive
            className="block h-9 w-full"
          />
        </div>
      )}
    </article>
  )
}
