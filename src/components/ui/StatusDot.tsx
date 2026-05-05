import type { Tone } from '#/lib/types'

const COLOR: Record<Tone, string> = {
  success: 'text-[var(--success)]',
  warning: 'text-[var(--warning)]',
  danger:  'text-[var(--danger)]',
  info:    'text-[var(--info)]',
  ember:   'text-[var(--ember)]',
  sea:     'text-[var(--sea)]',
  gold:    'text-[var(--gold)]',
  muted:   'text-[var(--text-muted)]',
}

export function StatusDot({ tone = 'muted', pulse = false }: { tone?: Tone; pulse?: boolean }) {
  return <span className={`dot ${pulse ? 'dot-pulse' : ''} ${COLOR[tone]}`} aria-hidden />
}
