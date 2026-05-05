import { CheckCircle2, Lock, X } from 'lucide-react'
import { useState } from 'react'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { Avatar } from '#/components/ui/Avatar'
import { useDispatch, useUserById } from '#/lib/store/hooks'
import { useCan } from '#/lib/store/useCan'
import { useToast } from '#/components/ui/toast/ToastProvider'
import { priorityTone, validationKindLabel, validationStateTone } from '#/lib/labels'
import { timeAgo, formatTime } from '#/lib/format'
import type { Validation } from '#/lib/types'
import { RejectModal } from './RejectModal'

export function ValidationCard({ v, currentUserId }: { v: Validation; currentUserId: string }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const canApprove = useCan('validation:approve')
  const requester = useUserById(v.requestedById)
  const decisionUser = useUserById(v.decisionBy ?? null)
  const [rejecting, setRejecting] = useState(false)

  function approve() {
    dispatch({ type: 'validation/approve', id: v.id, userId: currentUserId, note: 'Validé' })
    toast.push({ kind: 'success', title: 'Demande approuvée', body: `${v.code} — ${v.title}` })
  }

  function reject(note: string) {
    dispatch({ type: 'validation/reject', id: v.id, userId: currentUserId, note })
    toast.push({ kind: 'warning', title: 'Demande refusée', body: `${v.code} — motif consigné dans l'audit.` })
    setRejecting(false)
  }

  return (
    <article className="surface group relative overflow-hidden rounded-2xl p-5">
      {v.priority === 'critique' && (
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--danger)] to-transparent" />
      )}
      <div className="flex items-start gap-4">
        <Avatar initials={requester?.initials ?? '··'} seed={v.requestedById} size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <CodeTag>{v.code}</CodeTag>
            <Pill tone="muted">{validationKindLabel(v.kind)}</Pill>
            <Pill tone={priorityTone(v.priority)}>{v.priority}</Pill>
            <Pill tone={validationStateTone(v.state)}>
              {v.state === 'attente' ? 'En attente' : v.state === 'approuve' ? 'Approuvé' : 'Refusé'}
            </Pill>
          </div>
          <h3 className="font-display m-0 mt-2 text-[18px] font-semibold tracking-tight text-[var(--text)]">
            {v.title}
          </h3>
          <p className="m-0 mt-1 text-[12px] text-[var(--text-muted)]">
            <span className="text-[var(--text-soft)]">{requester?.name ?? '—'}</span> ·{' '}
            <span className="font-tech">{timeAgo(v.requestedAt)}</span> · {formatTime(v.requestedAt)}
          </p>
          <p className="m-0 mt-3 text-[13.5px] leading-7 text-[var(--text-soft)]">{v.description}</p>

          {v.state !== 'attente' && (
            <div className="mt-3 rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3 text-[12px]">
              <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Décision · audit
              </p>
              <p className="m-0 mt-1 text-[var(--text-soft)]">
                {decisionUser?.name ?? '—'} ·{' '}
                <span className="font-tech text-[var(--text-faint)]">{v.decisionAt ? timeAgo(v.decisionAt) : ''}</span>
              </p>
              {v.decisionNote && (
                <p className="m-0 mt-1 italic text-[12.5px] text-[var(--text-muted)]">« {v.decisionNote} »</p>
              )}
            </div>
          )}
        </div>

        {v.state === 'attente' && (
          <div className="flex shrink-0 flex-col gap-2">
            {canApprove ? (
              <>
                <button className="btn btn-success btn-sm" onClick={approve}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> Approuver
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => setRejecting(true)}>
                  <X className="h-3.5 w-3.5" /> Refuser
                </button>
              </>
            ) : (
              <span
                title="Seule la DG peut arbitrer cette demande."
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]"
              >
                <Lock className="h-3 w-3" /> Réservé DG
              </span>
            )}
          </div>
        )}
      </div>

      <RejectModal open={rejecting} onClose={() => setRejecting(false)} onConfirm={reject} code={v.code} />
    </article>
  )
}
