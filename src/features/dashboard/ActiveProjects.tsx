import { ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { ProgressBar } from '#/components/ui/ProgressBar'
import { useProjects } from '#/lib/store/hooks'
import { formatPercent, formatXOF } from '#/lib/format'
import { projectStatusLabel, projectStatusTone, riskLabel, riskTone } from '#/lib/labels'

export function ActiveProjects() {
  const projects = useProjects()
    .filter((p) => p.status !== 'cloture' && p.status !== 'brouillon')
    .slice(0, 4)

  return (
    <section className="surface rounded-2xl p-6 sm:p-7">
      <header className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow m-0">Projets en cours</p>
          <h2 className="font-display m-0 mt-1 text-2xl font-semibold tracking-tight text-[var(--text)]">
            Lecture rapide des opérations
          </h2>
        </div>
        <Link to="/projets" className="btn btn-ghost btn-sm">
          Tous les projets <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      <ul className="stagger-fast flex flex-col">
        {projects.map((p, i) => (
          <li
            key={p.id}
            className={`grid gap-4 py-4 md:grid-cols-[1.4fr_1fr_auto] md:items-center ${
              i < projects.length - 1 ? 'border-b border-[var(--line)]' : ''
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <CodeTag>{p.code}</CodeTag>
                <Pill tone={projectStatusTone(p.status)}>{projectStatusLabel(p.status)}</Pill>
                <Pill tone={riskTone(p.risk)}>Risque {riskLabel(p.risk)}</Pill>
              </div>
              <Link
                to="/projets/$id"
                params={{ id: p.id }}
                className="mt-2 block font-display text-[18px] font-semibold tracking-tight text-[var(--text)] no-underline hover:text-[var(--ember-bright)]"
              >
                {p.name}
              </Link>
              <p className="m-0 mt-0.5 text-[12.5px] text-[var(--text-muted)]">
                {p.site} · {p.type} · {p.owner}
              </p>
            </div>

            <div className="md:max-w-xs">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[var(--text-muted)]">Avancement</span>
                <span className="font-tech tabular font-semibold text-[var(--text)]">{p.progress} %</span>
              </div>
              <ProgressBar value={p.progress} className="mt-1.5" />
              <div className="mt-2 flex items-center justify-between text-[11.5px] text-[var(--text-muted)]">
                <span>
                  Marge{' '}
                  <span className="font-tech text-[var(--success-soft)]">{formatPercent(p.rentability, true)}</span>
                </span>
                <span className="font-tech text-[var(--text-faint)]">{formatXOF(p.budget)}</span>
              </div>
            </div>

            <Link
              to="/projets/$id"
              params={{ id: p.id }}
              className="btn btn-ghost btn-sm justify-self-start md:justify-self-end"
            >
              Ouvrir <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
