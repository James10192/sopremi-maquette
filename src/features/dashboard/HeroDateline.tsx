import { useNow } from '#/lib/useNow'
import { useCurrentUser } from '#/lib/store/hooks'
import { roleLabel } from '#/lib/labels'

export function HeroDateline() {
  const user = useCurrentUser()
  const now = useNow(60000)
  const date = now
    .toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase()
    .replace(/\./g, '')
  const hh = now.getHours().toString().padStart(2, '0')
  const mm = now.getMinutes().toString().padStart(2, '0')

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-tech text-[10.5px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
      <span>{date}</span>
      <span className="text-[var(--text-faint)]">·</span>
      <span className="tabular text-[var(--text-soft)]">{hh}:{mm}</span>
      <span className="text-[var(--text-faint)]">·</span>
      <span className="inline-flex items-center gap-1.5 text-[var(--ember-bright)]">
        <span className="dot dot-pulse text-[var(--ember)]" /> Live
      </span>
      <span className="text-[var(--text-faint)]">·</span>
      <span>Cockpit / {user ? roleLabel(user.role).split(' ').slice(0, 2).join(' ') : 'Invité'}</span>
    </div>
  )
}
