import { Avatar } from '#/components/ui/Avatar'
import { CodeTag } from '#/components/ui/CodeTag'
import { useDispatch } from '#/lib/store/hooks'
import { useToast } from '#/components/ui/toast/ToastProvider'
import { presenceLabel, presenceTone } from '#/lib/labels'
import { initialsOf } from '#/lib/format'
import type { Presence, Staff } from '#/lib/types'

const QUICK: { p: Presence; tone: string; label: string; key: string }[] = [
  { p: 'present', tone: 'border-[rgba(78,177,133,0.36)] bg-[rgba(78,177,133,0.10)] text-[var(--success-soft)] hover:bg-[rgba(78,177,133,0.20)]', label: 'Présent', key: 'P' },
  { p: 'mission', tone: 'border-[rgba(29,177,187,0.32)] bg-[rgba(29,177,187,0.10)] text-[#85e5ea] hover:bg-[rgba(29,177,187,0.20)]', label: 'Mission', key: 'M' },
  { p: 'absent_justifie', tone: 'border-[rgba(240,164,64,0.36)] bg-[rgba(240,164,64,0.10)] text-[var(--warning-soft)] hover:bg-[rgba(240,164,64,0.20)]', label: 'Absent', key: 'A' },
  { p: 'conge', tone: 'border-[rgba(95,168,211,0.32)] bg-[rgba(95,168,211,0.10)] text-[var(--info-soft)] hover:bg-[rgba(95,168,211,0.20)]', label: 'Congé', key: 'C' },
  { p: 'maladie', tone: 'border-[rgba(227,85,105,0.36)] bg-[rgba(227,85,105,0.10)] text-[var(--danger-soft)] hover:bg-[rgba(227,85,105,0.20)]', label: 'Maladie', key: 'L' },
]

export function PointageRow({ s }: { s: Staff }) {
  const dispatch = useDispatch()
  const toast = useToast()

  function set(p: Presence) {
    if (s.presence === p) return
    dispatch({ type: 'staff/presence', id: s.id, presence: p })
    toast.push({
      kind: 'info',
      title: 'Pointage enregistré',
      body: `${s.firstName} ${s.lastName} → ${presenceLabel(p)}`,
      ttl: 1800,
    })
  }

  return (
    <li className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 transition hover:bg-[rgba(255,255,255,0.035)]">
      <Avatar initials={initialsOf(s.firstName, s.lastName)} seed={s.id} size={36} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <CodeTag>{s.matricule}</CodeTag>
          <span className={`text-[10.5px] font-semibold uppercase tracking-[0.16em] ${
            presenceTone(s.presence) === 'success' ? 'text-[var(--success-soft)]'
              : presenceTone(s.presence) === 'warning' ? 'text-[var(--warning-soft)]'
              : presenceTone(s.presence) === 'danger' ? 'text-[var(--danger-soft)]'
              : presenceTone(s.presence) === 'sea' ? 'text-[#85e5ea]'
              : 'text-[var(--info-soft)]'
          }`}>
            {presenceLabel(s.presence)}
          </span>
        </div>
        <p className="m-0 mt-0.5 truncate text-[13px] font-semibold text-[var(--text)]">
          {s.firstName} {s.lastName}
        </p>
        <p className="m-0 truncate text-[11px] text-[var(--text-muted)]">{s.role} · {s.department}</p>
      </div>
      <div className="flex shrink-0 gap-1">
        {QUICK.map((q) => {
          const active = s.presence === q.p
          return (
            <button
              key={q.p}
              onClick={() => set(q.p)}
              title={`${q.label} (${q.key})`}
              className={`rounded-md border px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] transition ${
                active
                  ? q.tone + ' ring-1 ring-current'
                  : 'border-[var(--line)] bg-[rgba(255,255,255,0.025)] text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text)]'
              }`}
            >
              {q.label}
            </button>
          )
        })}
      </div>
    </li>
  )
}
