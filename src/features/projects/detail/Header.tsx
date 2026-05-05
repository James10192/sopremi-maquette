import { Link } from '@tanstack/react-router'
import { ArrowLeft, MapPin, User } from 'lucide-react'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { ProgressBar } from '#/components/ui/ProgressBar'
import { formatDate, formatPercent, formatXOF } from '#/lib/format'
import { projectStatusLabel, projectStatusTone, riskLabel, riskTone } from '#/lib/labels'
import type { Project } from '#/lib/types'

export function ProjectDetailHeader({ project }: { project: Project }) {
  return (
    <header className="surface relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,130,0,0.18),transparent_60%)] blur-2xl" aria-hidden />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Link to="/projets" className="btn btn-ghost btn-sm">
            <ArrowLeft className="h-3.5 w-3.5" /> Retour aux projets
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CodeTag>{project.code}</CodeTag>
          <Pill tone={projectStatusTone(project.status)}>{projectStatusLabel(project.status)}</Pill>
          <Pill tone={riskTone(project.risk)}>Risque {riskLabel(project.risk)}</Pill>
          <Pill tone="muted">{project.type}</Pill>
        </div>
        <h1 className="font-display m-0 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-tight text-[var(--text)]">
          {project.name}
        </h1>
        <p className="m-0 inline-flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {project.site}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" /> {project.owner}
          </span>
          <span className="font-tech">
            {formatDate(project.startDate)} → {formatDate(project.endDate)}
          </span>
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Avancement" big={`${project.progress} %`}>
            <ProgressBar value={project.progress} className="mt-2" />
          </Stat>
          <Stat label="Marge" big={formatPercent(project.rentability, true)} accent />
          <Stat label="Budget" big={formatXOF(project.budget)} mono />
        </div>
      </div>
    </header>
  )
}

function Stat({
  label,
  big,
  accent,
  mono,
  children,
}: {
  label: string
  big: string
  accent?: boolean
  mono?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className="surface-soft rounded-xl p-4">
      <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.20em] text-[var(--text-muted)]">{label}</p>
      <p
        className={`m-0 mt-1 ${mono ? 'font-tech tabular' : 'font-display'} text-[1.6rem] font-semibold tracking-tight ${
          accent ? 'text-[var(--success-soft)]' : 'text-[var(--text)]'
        }`}
      >
        {big}
      </p>
      {children}
    </div>
  )
}
