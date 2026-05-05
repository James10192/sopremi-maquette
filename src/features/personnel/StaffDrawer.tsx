import { Lock } from 'lucide-react'
import { Drawer } from '#/components/ui/Drawer'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { Avatar } from '#/components/ui/Avatar'
import { useDispatch, useProject, useStaff } from '#/lib/store/hooks'
import { useCan } from '#/lib/store/useCan'
import { useToast } from '#/components/ui/toast/ToastProvider'
import { presenceLabel, presenceTone } from '#/lib/labels'
import { formatDate, initialsOf } from '#/lib/format'
import type { Presence, Staff } from '#/lib/types'

const PRESENCE: Presence[] = ['present', 'absent_justifie', 'conge', 'mission', 'maladie']

export function StaffDrawer({ s: passed, onClose }: { s: Staff | null; onClose: () => void }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const canPresence = useCan('staff:presence')
  // Re-read the live record so prop changes from the store reflect here
  const live = useStaff().find((x) => x.id === passed?.id) ?? null
  const s = live ?? passed
  const project = useProject(s?.projectId ?? undefined)

  if (!s) return null

  function setPresence(p: Presence) {
    if (!s) return
    dispatch({ type: 'staff/presence', id: s.id, presence: p })
    toast.push({
      kind: 'info',
      title: 'Pointage mis à jour',
      body: `${s.firstName} ${s.lastName} → ${presenceLabel(p)}`,
    })
  }

  return (
    <Drawer
      open={Boolean(s)}
      onClose={onClose}
      eyebrow="Fiche personnel"
      title={`${s.firstName} ${s.lastName}`}
      width={500}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Avatar initials={initialsOf(s.firstName, s.lastName)} seed={s.id} size={64} />
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <CodeTag>{s.matricule}</CodeTag>
              <Pill tone={presenceTone(s.presence)}>{presenceLabel(s.presence)}</Pill>
            </div>
            <p className="m-0 mt-1 text-[14px] font-semibold text-[var(--text)]">{s.role}</p>
            <p className="m-0 text-[12px] text-[var(--text-muted)]">{s.department}</p>
          </div>
        </div>

        <dl className="grid gap-3 text-[13px] sm:grid-cols-2">
          <Field label="Téléphone" value={s.phone} mono />
          <Field label="Date d'embauche" value={formatDate(s.hireDate)} mono />
          <Field label="Projet courant" value={project?.code ?? 'Aucun'} mono />
        </dl>

        <div>
          <p className="label m-0 mb-2">Certifications</p>
          <div className="flex flex-wrap gap-1.5">
            {s.certifications.map((c) => (
              <Pill key={c} tone="muted">{c}</Pill>
            ))}
          </div>
        </div>

        <div>
          <p className="label m-0 mb-2">Modifier le pointage</p>
          {canPresence ? (
            <div className="grid grid-cols-2 gap-2">
              {PRESENCE.map((p) => (
                <button
                  key={p}
                  onClick={() => setPresence(p)}
                  className={`btn ${s.presence === p ? 'btn-primary' : ''}`}
                >
                  {presenceLabel(p)}
                </button>
              ))}
            </div>
          ) : (
            <p className="m-0 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] px-3 py-2 text-[12px] text-[var(--text-muted)]">
              <Lock className="h-3.5 w-3.5" />
              Saisie réservée RH / DG / DOM.
            </p>
          )}
        </div>
      </div>
    </Drawer>
  )
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</dt>
      <dd className={`m-0 mt-0.5 ${mono ? 'font-tech tabular' : ''} text-[var(--text)]`}>{value}</dd>
    </div>
  )
}
