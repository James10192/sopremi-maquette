import { Link } from '@tanstack/react-router'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { ProgressBar } from '#/components/ui/ProgressBar'
import { useProjects } from '#/lib/store/hooks'
import { formatPercent } from '#/lib/format'

export function MarginRanking() {
  const top = [...useProjects()].sort((a, b) => b.rentability - a.rentability).slice(0, 5)
  const max = Math.max(1, ...top.map((p) => p.rentability))

  return (
    <section className="surface flex flex-col gap-4 rounded-2xl p-5">
      <header>
        <p className="eyebrow m-0">Reporting / Marge</p>
        <h3 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
          Top rentabilité
        </h3>
        <p className="m-0 mt-0.5 text-[12px] text-[var(--text-muted)]">5 projets les mieux notés.</p>
      </header>
      <ul className="flex flex-col gap-2.5">
        {top.map((p, i) => (
          <li key={p.id} className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-tech tabular inline-flex h-6 w-6 items-center justify-center rounded-md border border-[var(--line)] bg-[rgba(255,130,0,0.10)] text-[11px] font-semibold text-[var(--ember-bright)]">
                  #{i + 1}
                </span>
                <CodeTag>{p.code}</CodeTag>
              </div>
              <span className="font-tech tabular text-[14px] font-semibold text-[var(--success-soft)]">
                {formatPercent(p.rentability, true)}
              </span>
            </div>
            <Link
              to="/projets/$id"
              params={{ id: p.id }}
              className="mt-1 block truncate text-[13px] font-semibold text-[var(--text)] no-underline hover:text-[var(--ember-bright)]"
            >
              {p.name}
            </Link>
            <ProgressBar value={(p.rentability / max) * 100} className="mt-2" />
            <p className="m-0 mt-1.5 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>{p.site}</span>
              <Pill tone="muted">{p.owner}</Pill>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
