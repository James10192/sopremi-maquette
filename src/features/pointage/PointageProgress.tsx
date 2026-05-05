import { useStaff } from '#/lib/store/hooks'

export function PointageProgress() {
  const staff = useStaff()
  const total = staff.length
  const counted = staff.filter((s) => s.presence !== undefined).length // all are set in seed; treat 'absent_justifie' as counted too
  // For the demo: count "today's pointing" as anyone whose presence is set (always true here).
  const present = staff.filter((s) => s.presence === 'present').length
  const mission = staff.filter((s) => s.presence === 'mission').length
  const absent = staff.filter((s) => s.presence === 'absent_justifie').length
  const conge = staff.filter((s) => s.presence === 'conge').length
  const maladie = staff.filter((s) => s.presence === 'maladie').length
  const ratio = Math.round((counted / Math.max(1, total)) * 100)

  return (
    <section className="surface-soft rounded-xl px-5 py-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow-muted m-0">Pointage du jour</p>
          <p className="m-0 mt-1 text-[13px] text-[var(--text-soft)]">
            <span className="font-tech tabular text-[var(--text)]">{counted}</span> agents pointés sur{' '}
            <span className="font-tech tabular">{total}</span> · clôture prévue 08:15
          </p>
        </div>
        <span className="font-tech tabular text-[1.6rem] font-semibold leading-none text-[var(--ember-bright)]">
          {ratio} <span className="text-[var(--text-muted)] text-[14px]">%</span>
        </span>
      </div>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.04)]">
        <Seg value={present} total={total} color="var(--success)" />
        <Seg value={mission} total={total} color="var(--sea)" />
        <Seg value={absent} total={total} color="var(--warning)" />
        <Seg value={conge} total={total} color="var(--info)" />
        <Seg value={maladie} total={total} color="var(--danger)" />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[var(--text-muted)]">
        <Legend color="var(--success)" label="Présent" value={present} />
        <Legend color="var(--sea)" label="Mission" value={mission} />
        <Legend color="var(--warning)" label="Absent" value={absent} />
        <Legend color="var(--info)" label="Congé" value={conge} />
        <Legend color="var(--danger)" label="Maladie" value={maladie} />
      </div>
    </section>
  )
}

function Seg({ value, total, color }: { value: number; total: number; color: string }) {
  const w = (value / Math.max(1, total)) * 100
  if (w === 0) return null
  return <span style={{ width: `${w}%`, background: color, transition: 'width 600ms ease-out' }} />
}

function Legend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <span>{label}</span>
      <span className="font-tech tabular text-[var(--text-soft)]">{value}</span>
    </span>
  )
}
