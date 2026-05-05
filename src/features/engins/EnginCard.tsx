import { Fuel, Gauge, Wrench } from 'lucide-react'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { Sparkline } from '#/components/ui/Sparkline'
import { enginStateLabel, enginStateTone } from '#/lib/labels'
import { formatHours } from '#/lib/format'
import type { Engin } from '#/lib/types'

export function EnginCard({
  engin,
  onClick,
}: {
  engin: Engin
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3.5 text-left transition hover:-translate-y-0.5 hover:border-[rgba(255,130,0,0.32)] hover:bg-[rgba(255,130,0,0.05)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <CodeTag>{engin.code}</CodeTag>
            <Pill tone={enginStateTone(engin.state)}>{enginStateLabel(engin.state)}</Pill>
          </div>
          <p className="m-0 mt-2 text-[13.5px] font-semibold text-[var(--text)]">{engin.name}</p>
          <p className="m-0 mt-0.5 text-[11.5px] text-[var(--text-muted)]">{engin.brand} · {engin.type}</p>
        </div>
        <Sparkline data={engin.recentLoad} width={70} height={28} />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Vital icon={<Fuel className="h-3 w-3" />} label="Carburant" value={`${engin.fuelLevel}%`} />
        <Vital icon={<Gauge className="h-3 w-3" />} label="Uptime" value={`${engin.uptime}%`} />
        <Vital icon={<Wrench className="h-3 w-3" />} label="Heures" value={formatHours(engin.hoursToday)} />
      </div>
    </button>
  )
}

function Vital({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-2">
      <p className="m-0 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {icon} {label}
      </p>
      <p className="font-tech tabular m-0 mt-1 text-[12.5px] font-semibold text-[var(--text)]">{value}</p>
    </div>
  )
}
