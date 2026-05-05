import { Avatar } from '#/components/ui/Avatar'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { initialsOf } from '#/lib/format'
import { presenceLabel, presenceTone } from '#/lib/labels'
import type { Project, Staff } from '#/lib/types'

export function StaffRow({
  s,
  project,
  onClick,
}: {
  s: Staff
  project: Project | undefined
  onClick: () => void
}) {
  return (
    <tr onClick={onClick} className="cursor-pointer transition hover:bg-[rgba(255,255,255,0.025)]">
      <td>
        <div className="flex items-center gap-3">
          <Avatar initials={initialsOf(s.firstName, s.lastName)} seed={s.id} size={36} />
          <div className="min-w-0">
            <p className="m-0 truncate text-[13.5px] font-semibold text-[var(--text)]">
              {s.firstName} {s.lastName}
            </p>
            <p className="m-0 truncate text-[11.5px] text-[var(--text-muted)]">{s.role}</p>
          </div>
        </div>
      </td>
      <td><CodeTag>{s.matricule}</CodeTag></td>
      <td><span className="text-[var(--text-soft)]">{s.department}</span></td>
      <td><Pill tone={presenceTone(s.presence)}>{presenceLabel(s.presence)}</Pill></td>
      <td>
        {project ? <CodeTag>{project.code}</CodeTag> : <span className="text-[var(--text-faint)]">—</span>}
      </td>
      <td className="font-tech tabular text-[var(--text-muted)]">{s.phone}</td>
    </tr>
  )
}
