import { Donut } from '#/components/ui/Donut'
import { useStaff } from '#/lib/store/hooks'

export function PresenceSummary() {
  const staff = useStaff()
  const totals = {
    present: staff.filter((s) => s.presence === 'present').length,
    mission: staff.filter((s) => s.presence === 'mission').length,
    absent: staff.filter((s) => s.presence === 'absent_justifie').length,
    conge: staff.filter((s) => s.presence === 'conge').length,
    maladie: staff.filter((s) => s.presence === 'maladie').length,
  }
  const presenceRatio = Math.round(((totals.present + totals.mission) / Math.max(1, staff.length)) * 100)

  return (
    <section className="surface flex flex-col gap-4 rounded-2xl p-5">
      <header>
        <p className="eyebrow m-0">Pointage du jour</p>
        <h3 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
          Présence consolidée
        </h3>
      </header>
      <Donut
        layout="col"
        size={160}
        thickness={20}
        centerLabel={`${presenceRatio} %`}
        centerSublabel="Sur site"
        data={[
          { label: 'Présents', value: totals.present, color: 'var(--success)' },
          { label: 'En mission', value: totals.mission, color: 'var(--sea)' },
          { label: 'Absent justifié', value: totals.absent, color: 'var(--warning)' },
          { label: 'En congé', value: totals.conge, color: 'var(--info)' },
          { label: 'Maladie', value: totals.maladie, color: 'var(--danger)' },
        ]}
      />
      <p className="font-tech m-0 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
        Pointage clôturé 08:15 · synchronisé terrain
      </p>
    </section>
  )
}
