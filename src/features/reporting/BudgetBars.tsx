import { BarChart } from '#/components/ui/BarChart'
import { useProjects } from '#/lib/store/hooks'
import { formatXOF } from '#/lib/format'

export function BudgetBars() {
  const projects = useProjects().filter((p) => p.status !== 'cloture')
  const data = projects.map((p) => ({ label: p.code.slice(-3), value: Math.round(p.budget / 1_000_000) }))
  const total = projects.reduce((s, p) => s + p.budget, 0)

  return (
    <section className="surface flex flex-col gap-4 rounded-2xl p-5">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow m-0">Reporting / Budgets</p>
          <h3 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
            Budget par projet
          </h3>
        </div>
        <div className="text-right">
          <p className="font-tech tabular m-0 text-lg font-semibold text-[var(--text)]">{formatXOF(total)}</p>
          <p className="m-0 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">cumul actif</p>
        </div>
      </header>
      <BarChart data={data} height={200} barColor="var(--ember)" showValues />
      <p className="font-tech m-0 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
        Valeurs en M FCFA · projets non clôturés
      </p>
    </section>
  )
}
