import { useNow } from '#/lib/useNow'

export function HeaderClock() {
  const now = useNow(1000)
  const hh = now.getHours().toString().padStart(2, '0')
  const mm = now.getMinutes().toString().padStart(2, '0')
  const ss = now.getSeconds().toString().padStart(2, '0')
  const date = now.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' })

  return (
    <div className="hidden items-center gap-3 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] px-3 py-1.5 md:flex">
      <span className="dot dot-pulse text-[var(--ember)]" aria-hidden />
      <div className="flex flex-col leading-tight">
        <span className="font-tech tabular text-[13px] font-semibold text-[var(--text)]">
          {hh}:{mm}
          <span className="text-[var(--text-faint)]">:{ss}</span>
        </span>
        <span className="text-[9.5px] uppercase tracking-[0.20em] text-[var(--text-muted)]">{date}</span>
      </div>
    </div>
  )
}
