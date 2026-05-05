import { Link } from '@tanstack/react-router'
import { ArrowUpRight, MapPin, Wrench, Users } from 'lucide-react'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { ProgressBar } from '#/components/ui/ProgressBar'
import { formatPercent, formatXOF } from '#/lib/format'
import { projectStatusLabel, projectStatusTone, riskLabel, riskTone } from '#/lib/labels'
import type { Project } from '#/lib/types'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projets/$id"
      params={{ id: project.id }}
      className="surface group relative block overflow-hidden rounded-2xl p-5 no-underline transition hover:-translate-y-0.5 hover:border-[rgba(255,130,0,0.32)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CodeTag>{project.code}</CodeTag>
          <Pill tone={projectStatusTone(project.status)}>{projectStatusLabel(project.status)}</Pill>
          <Pill tone={riskTone(project.risk)}>Risque {riskLabel(project.risk)}</Pill>
        </div>
        <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition group-hover:text-[var(--ember-bright)]" />
      </div>

      <h3 className="font-display m-0 mt-4 text-[20px] font-semibold leading-tight tracking-tight text-[var(--text)]">
        {project.name}
      </h3>
      <p className="m-0 mt-1 text-[12.5px] text-[var(--text-muted)]">
        <MapPin className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />
        {project.site} · {project.type}
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[var(--text-muted)]">Avancement</span>
          <span className="font-tech tabular font-semibold text-[var(--text)]">{project.progress} %</span>
        </div>
        <ProgressBar value={project.progress} className="mt-1.5" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-[11.5px]">
        <Stat label="Marge" value={formatPercent(project.rentability, true)} accent />
        <Stat label="Budget" value={formatXOF(project.budget)} />
        <Stat
          label="Ressources"
          value={
            <span className="inline-flex items-center gap-2">
              <Wrench className="h-3 w-3 text-[var(--text-muted)]" />
              {project.enginIds.length}
              <Users className="ml-1 h-3 w-3 text-[var(--text-muted)]" />
              {project.staffIds.length}
            </span>
          }
        />
      </div>
    </Link>
  )
}

function Stat({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-2.5">
      <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</p>
      <p className={`m-0 mt-1 font-tech text-[12.5px] font-semibold ${accent ? 'text-[var(--success-soft)]' : 'text-[var(--text)]'}`}>
        {value}
      </p>
    </div>
  )
}
