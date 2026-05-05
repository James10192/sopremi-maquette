import type { ReactNode } from 'react'
import type { Tone } from '#/lib/types'
import { StatusDot } from '#/components/ui/StatusDot'

const TONE_BG: Record<Tone, string> = {
  success: 'from-[rgba(78,177,133,0.10)]',
  warning: 'from-[rgba(240,164,64,0.12)]',
  danger:  'from-[rgba(227,85,105,0.12)]',
  info:    'from-[rgba(95,168,211,0.10)]',
  ember:   'from-[rgba(255,130,0,0.10)]',
  sea:     'from-[rgba(29,177,187,0.10)]',
  gold:    'from-[rgba(212,165,66,0.10)]',
  muted:   'from-[rgba(255,255,255,0.04)]',
}

export function EnginColumn({
  title,
  count,
  tone,
  children,
}: {
  title: string
  count: number
  tone: Tone
  children: ReactNode
}) {
  return (
    <section
      className={`flex min-h-[300px] flex-col gap-3 rounded-2xl border border-[var(--line)] bg-gradient-to-b ${TONE_BG[tone]} to-transparent p-3.5`}
    >
      <header className="flex items-center justify-between">
        <h3 className="m-0 inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">
          <StatusDot tone={tone} pulse={tone === 'danger'} />
          {title}
        </h3>
        <span className="font-tech tabular text-[11px] text-[var(--text-muted)]">{count}</span>
      </header>
      <div className="stagger-fast flex flex-col gap-2">{children}</div>
    </section>
  )
}
