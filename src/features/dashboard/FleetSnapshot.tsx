import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Donut } from '#/components/ui/Donut'
import { CodeTag } from '#/components/ui/CodeTag'
import { Pill } from '#/components/ui/Pill'
import { Sparkline } from '#/components/ui/Sparkline'
import { useEngins } from '#/lib/store/hooks'
import { enginStateLabel, enginStateTone } from '#/lib/labels'

export function FleetSnapshot() {
  const engins = useEngins()
  const totals = {
    disponible: engins.filter((e) => e.state === 'disponible').length,
    affecte: engins.filter((e) => e.state === 'affecte').length,
    maintenance: engins.filter((e) => e.state === 'maintenance').length,
    panne: engins.filter((e) => e.state === 'panne').length,
  }

  return (
    <section className="surface flex flex-col gap-5 rounded-2xl p-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow m-0">Flotte</p>
          <h2 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
            Snapshot des engins
          </h2>
        </div>
        <Link to="/ressources/engins" className="btn btn-ghost btn-sm">
          Détails <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      <Donut
        size={150}
        thickness={20}
        centerLabel={`${engins.length}`}
        centerSublabel="Engins"
        data={[
          { label: 'Disponibles', value: totals.disponible, color: 'var(--success)' },
          { label: 'Affectés', value: totals.affecte, color: 'var(--info)' },
          { label: 'Maintenance', value: totals.maintenance, color: 'var(--warning)' },
          { label: 'En panne', value: totals.panne, color: 'var(--danger)' },
        ]}
      />

      <div className="rule" />

      <ul className="flex flex-col gap-2">
        {engins
          .filter((e) => e.state === 'maintenance' || e.state === 'panne')
          .slice(0, 3)
          .map((e) => (
            <li
              key={e.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] px-3 py-2.5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <CodeTag>{e.code}</CodeTag>
                  <Pill tone={enginStateTone(e.state)}>{enginStateLabel(e.state)}</Pill>
                </div>
                <p className="m-0 mt-1 truncate text-[12.5px] font-semibold text-[var(--text)]">{e.name}</p>
              </div>
              <Sparkline data={e.recentLoad} width={80} height={26} stroke="var(--warning-soft)" fill="rgba(240,164,64,0.18)" />
            </li>
          ))}
      </ul>
    </section>
  )
}
