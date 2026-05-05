import { Sparkline } from '#/components/ui/Sparkline'
import { CodeTag } from '#/components/ui/CodeTag'
import { Pill } from '#/components/ui/Pill'
import { useEngins } from '#/lib/store/hooks'
import { enginStateLabel, enginStateTone } from '#/lib/labels'

export function FleetUptime() {
  const engins = useEngins()
  const avgUptime = Math.round(engins.reduce((s, e) => s + e.uptime, 0) / Math.max(1, engins.length))

  return (
    <section className="surface flex flex-col gap-4 rounded-2xl p-5">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow m-0">Reporting / Flotte</p>
          <h3 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
            Uptime des engins
          </h3>
        </div>
        <div className="text-right">
          <p className="font-tech tabular m-0 text-lg font-semibold text-[var(--text)]">{avgUptime}%</p>
          <p className="m-0 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">moyenne</p>
        </div>
      </header>
      <ul className="flex flex-col gap-1.5">
        {[...engins]
          .sort((a, b) => b.uptime - a.uptime)
          .slice(0, 8)
          .map((e) => (
            <li
              key={e.id}
              className="grid items-center gap-3 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-2.5"
              style={{ gridTemplateColumns: '120px 1fr auto auto' }}
            >
              <CodeTag>{e.code}</CodeTag>
              <span className="truncate text-[12.5px] text-[var(--text-soft)]">{e.name}</span>
              <Sparkline data={e.recentLoad} width={72} height={22} />
              <span className="font-tech tabular text-[12.5px] text-[var(--text)]">{e.uptime}%</span>
              <span className="col-span-4 mt-1.5 inline-flex items-center gap-1.5">
                <Pill tone={enginStateTone(e.state)}>{enginStateLabel(e.state)}</Pill>
              </span>
            </li>
          ))}
      </ul>
    </section>
  )
}
