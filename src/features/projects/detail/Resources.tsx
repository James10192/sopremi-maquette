import { Plus, Truck, UserCheck, Users, X } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '#/components/ui/Avatar'
import { CodeTag } from '#/components/ui/CodeTag'
import { Pill } from '#/components/ui/Pill'
import { Drawer } from '#/components/ui/Drawer'
import { useDispatch, useEngins, useStaff } from '#/lib/store/hooks'
import { useCan, useOwnsProject } from '#/lib/store/useCan'
import { initialsOf } from '#/lib/format'
import { enginStateLabel, enginStateTone, presenceLabel, presenceTone } from '#/lib/labels'
import { useToast } from '#/components/ui/toast/ToastProvider'
import type { Project } from '#/lib/types'

function useCanEditProject(project: Project): boolean {
  const isOwner = useOwnsProject(project.owner)
  const canAny = useCan('project:edit-any')
  const canOwn = useCan('project:edit-own')
  return canAny || (isOwner && canOwn)
}

export function ProjectResources({ project }: { project: Project }) {
  const canEdit = useCanEditProject(project)
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <ResourceCard
        title="Engins"
        eyebrow="Flotte affectée"
        icon={<Truck className="h-3.5 w-3.5" />}
        action={canEdit ? <EnginsDrawerTrigger project={project} /> : null}
      >
        <ProjectEngins project={project} canEdit={canEdit} />
      </ResourceCard>
      <ResourceCard
        title="Personnel"
        eyebrow="Équipe sur site"
        icon={<Users className="h-3.5 w-3.5" />}
        action={canEdit ? <StaffDrawerTrigger project={project} /> : null}
      >
        <ProjectStaff project={project} canEdit={canEdit} />
      </ResourceCard>
    </section>
  )
}

function ResourceCard({
  title,
  eyebrow,
  icon,
  action,
  children,
}: {
  title: string
  eyebrow: string
  icon: React.ReactNode
  action: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <article className="surface flex flex-col gap-3 rounded-2xl p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow-muted m-0 inline-flex items-center gap-2">
            {icon} {eyebrow}
          </p>
          <h3 className="font-display m-0 mt-0.5 text-lg font-semibold tracking-tight text-[var(--text)]">
            {title}
          </h3>
        </div>
        {action}
      </header>
      {children}
    </article>
  )
}

function ProjectEngins({ project, canEdit }: { project: Project; canEdit: boolean }) {
  const engins = useEngins().filter((e) => project.enginIds.includes(e.id))
  const dispatch = useDispatch()
  const toast = useToast()

  if (engins.length === 0) {
    return <p className="m-0 text-[13px] text-[var(--text-muted)]">Aucun engin affecté.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {engins.map((e) => (
        <li
          key={e.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <CodeTag>{e.code}</CodeTag>
              <Pill tone={enginStateTone(e.state)}>{enginStateLabel(e.state)}</Pill>
            </div>
            <p className="m-0 mt-1 truncate text-[13px] font-semibold text-[var(--text)]">{e.name}</p>
          </div>
          {canEdit && (
            <button
              className="btn btn-ghost btn-icon"
              aria-label="Retirer"
              onClick={() => {
                dispatch({ type: 'project/unassign-engin', projectId: project.id, enginId: e.id })
                toast.push({ kind: 'info', title: 'Engin libéré', body: `${e.code} retiré du projet.` })
              }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

function ProjectStaff({ project, canEdit }: { project: Project; canEdit: boolean }) {
  const staff = useStaff().filter((s) => project.staffIds.includes(s.id))
  const dispatch = useDispatch()
  const toast = useToast()

  if (staff.length === 0) {
    return <p className="m-0 text-[13px] text-[var(--text-muted)]">Aucun personnel affecté.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {staff.map((s) => (
        <li
          key={s.id}
          className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3"
        >
          <Avatar initials={initialsOf(s.firstName, s.lastName)} seed={s.id} size={36} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <CodeTag>{s.matricule}</CodeTag>
              <Pill tone={presenceTone(s.presence)}>{presenceLabel(s.presence)}</Pill>
            </div>
            <p className="m-0 mt-1 truncate text-[13px] font-semibold text-[var(--text)]">
              {s.firstName} {s.lastName}
            </p>
            <p className="m-0 truncate text-[11.5px] text-[var(--text-muted)]">{s.role}</p>
          </div>
          {canEdit && (
            <button
              className="btn btn-ghost btn-icon"
              aria-label="Retirer"
              onClick={() => {
                dispatch({ type: 'project/unassign-staff', projectId: project.id, staffId: s.id })
                toast.push({ kind: 'info', title: 'Membre retiré', body: `${s.firstName} ${s.lastName} libéré.` })
              }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

function EnginsDrawerTrigger({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const engins = useEngins().filter((e) => !project.enginIds.includes(e.id))
  const dispatch = useDispatch()
  const toast = useToast()

  return (
    <>
      <button className="btn btn-sm" onClick={() => setOpen(true)}>
        <Plus className="h-3.5 w-3.5" />
        Affecter
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} eyebrow="Affecter un engin" title="Choisir une machine">
        <ul className="flex flex-col gap-2">
          {engins.map((e) => (
            <li
              key={e.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <CodeTag>{e.code}</CodeTag>
                  <Pill tone={enginStateTone(e.state)}>{enginStateLabel(e.state)}</Pill>
                </div>
                <p className="m-0 mt-1 truncate text-[13px] font-semibold text-[var(--text)]">{e.name}</p>
              </div>
              <button
                className="btn btn-success btn-sm"
                onClick={() => {
                  dispatch({ type: 'project/assign-engin', projectId: project.id, enginId: e.id })
                  toast.push({ kind: 'success', title: 'Engin affecté', body: `${e.code} → ${project.code}` })
                  setOpen(false)
                }}
              >
                <UserCheck className="h-3.5 w-3.5" /> Affecter
              </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  )
}

function StaffDrawerTrigger({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const staff = useStaff().filter((s) => !project.staffIds.includes(s.id))
  const dispatch = useDispatch()
  const toast = useToast()

  return (
    <>
      <button className="btn btn-sm" onClick={() => setOpen(true)}>
        <Plus className="h-3.5 w-3.5" />
        Affecter
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} eyebrow="Affecter du personnel" title="Choisir un membre">
        <ul className="flex flex-col gap-2">
          {staff.map((s) => (
            <li
              key={s.id}
              className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3"
            >
              <Avatar initials={initialsOf(s.firstName, s.lastName)} seed={s.id} size={36} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <CodeTag>{s.matricule}</CodeTag>
                  <Pill tone={presenceTone(s.presence)}>{presenceLabel(s.presence)}</Pill>
                </div>
                <p className="m-0 mt-1 truncate text-[13px] font-semibold text-[var(--text)]">
                  {s.firstName} {s.lastName}
                </p>
                <p className="m-0 truncate text-[11.5px] text-[var(--text-muted)]">{s.role}</p>
              </div>
              <button
                className="btn btn-success btn-sm"
                onClick={() => {
                  dispatch({ type: 'project/assign-staff', projectId: project.id, staffId: s.id })
                  toast.push({ kind: 'success', title: 'Affecté', body: `${s.firstName} → ${project.code}` })
                  setOpen(false)
                }}
              >
                <UserCheck className="h-3.5 w-3.5" /> Affecter
              </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  )
}
