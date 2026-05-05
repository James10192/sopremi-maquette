import { Lock } from 'lucide-react'
import { useDispatch } from '#/lib/store/hooks'
import { useCan, useOwnsProject } from '#/lib/store/useCan'
import { useToast } from '#/components/ui/toast/ToastProvider'
import type { Project, ProjectStatus } from '#/lib/types'
import { projectStatusLabel } from '#/lib/labels'

const NEXT: Record<ProjectStatus, ProjectStatus[]> = {
  brouillon: ['attente_dg'],
  attente_dg: ['actif', 'brouillon'],
  actif: ['pause', 'cloture'],
  pause: ['actif', 'cloture'],
  cloture: [],
}

export function StatusActions({ project }: { project: Project }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const canChangeStatus = useCan('project:status-change')
  const isOwner = useOwnsProject(project.owner)
  const canEditOwn = useCan('project:edit-own')
  const canAct = canChangeStatus || (isOwner && canEditOwn)
  const transitions = NEXT[project.status]

  if (transitions.length === 0) return null

  if (!canAct) {
    return (
      <section className="surface flex flex-col gap-3 rounded-2xl p-5">
        <header>
          <p className="eyebrow m-0">Actions</p>
          <h3 className="font-display m-0 mt-1 text-lg font-semibold tracking-tight text-[var(--text)]">
            Lecture seule
          </h3>
        </header>
        <p className="m-0 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] px-3 py-2 text-[12.5px] text-[var(--text-muted)]">
          <Lock className="h-3.5 w-3.5" />
          Seuls le porteur du projet, la DG ou la DOM peuvent faire évoluer le statut.
        </p>
      </section>
    )
  }

  return (
    <section className="surface flex flex-col gap-3 rounded-2xl p-5">
      <header>
        <p className="eyebrow m-0">Actions</p>
        <h3 className="font-display m-0 mt-1 text-lg font-semibold tracking-tight text-[var(--text)]">
          Faire avancer le projet
        </h3>
      </header>
      <div className="flex flex-col gap-2">
        {transitions.map((t) => (
          <button
            key={t}
            className={t === 'cloture' ? 'btn btn-danger' : t === 'actif' ? 'btn btn-success' : 'btn'}
            onClick={() => {
              dispatch({ type: 'project/status', id: project.id, status: t })
              toast.push({
                kind: t === 'cloture' ? 'warning' : 'success',
                title: 'Statut mis à jour',
                body: `${project.code} → ${projectStatusLabel(t)}`,
              })
            }}
          >
            Passer en « {projectStatusLabel(t)} »
          </button>
        ))}
      </div>
      <p className="font-tech m-0 text-[10.5px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
        Toutes les transitions sont consignées dans l'audit.
      </p>
    </section>
  )
}
