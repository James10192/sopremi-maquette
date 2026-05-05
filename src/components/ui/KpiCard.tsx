import type { LucideIcon } from 'lucide-react'
import type { Tone } from '#/lib/types'
import { ToneIcon } from './Pill'
import { Sparkline } from './Sparkline'

type Props = {
  label: string
  value: string
  detail?: string
  icon: LucideIcon
  tone?: Tone
  trend?: number[]
}

export function KpiCard({ label, value, detail, icon: Icon, tone = 'ember', trend }: Props) {
  return (
    <article className="surface group relative overflow-hidden rounded-xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="eyebrow-muted m-0">{label}</p>
          <p className="m-0 font-display text-[2.4rem] font-semibold leading-none tracking-tight text-[var(--text)]">
            {value}
          </p>
        </div>
        <ToneIcon tone={tone}>
          <Icon className="h-4 w-4" />
        </ToneIcon>
      </div>
      {detail && <p className="mt-4 mb-0 text-[13px] leading-6 text-[var(--text-muted)]">{detail}</p>}
      {trend && (
        <div className="mt-3 -mb-1 -mr-1 flex justify-end opacity-90">
          <Sparkline data={trend} width={120} height={28} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.18)] to-transparent" />
    </article>
  )
}
