import type { ReactNode } from 'react'
import type { Tone } from '#/lib/types'

const TONE: Record<Tone, string> = {
  success: 'border-[rgba(78,177,133,0.36)] bg-[rgba(78,177,133,0.12)] text-[var(--success-soft)]',
  warning: 'border-[rgba(240,164,64,0.36)] bg-[rgba(240,164,64,0.14)] text-[var(--warning-soft)]',
  danger:  'border-[rgba(227,85,105,0.36)] bg-[rgba(227,85,105,0.12)] text-[var(--danger-soft)]',
  info:    'border-[rgba(95,168,211,0.34)] bg-[rgba(95,168,211,0.12)] text-[var(--info-soft)]',
  ember:   'border-[rgba(255,130,0,0.40)] bg-[rgba(255,130,0,0.14)] text-[var(--ember-bright)]',
  sea:     'border-[rgba(29,177,187,0.34)] bg-[rgba(29,177,187,0.12)] text-[#85e5ea]',
  gold:    'border-[rgba(212,165,66,0.36)] bg-[rgba(212,165,66,0.12)] text-[var(--gold-soft)]',
  muted:   'border-[var(--line)] bg-[rgba(255,255,255,0.04)] text-[var(--text-muted)]',
}

export function Pill({ tone = 'muted', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`pill ${TONE[tone]}`}>{children}</span>
}

export function ToneIcon({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-lg border p-2 ${TONE[tone]}`}>
      {children}
    </span>
  )
}
