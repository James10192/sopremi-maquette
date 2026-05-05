import { Link } from '@tanstack/react-router'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { usePendingValidations, useUserById } from '#/lib/store/hooks'
import { priorityTone, validationKindLabel } from '#/lib/labels'
import { timeAgo } from '#/lib/format'

export function ValidationPulse() {
  const items = usePendingValidations().slice(0, 4)

  return (
    <section className="surface rounded-2xl p-6">
      <header className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow m-0">Validation DG</p>
          <h2 className="font-display m-0 mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">
            File d'arbitrage
          </h2>
        </div>
        <Link to="/validation" className="btn btn-ghost btn-sm">
          Tout voir <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      {items.length === 0 ? (
        <div className="surface-soft flex items-center gap-3 rounded-xl p-4">
          <ShieldCheck className="h-4 w-4 text-[var(--success-soft)]" />
          <p className="m-0 text-[13px] text-[var(--text-muted)]">Aucune demande en attente.</p>
        </div>
      ) : (
        <ul className="stagger-fast flex flex-col gap-2.5">
          {items.map((v) => (
            <ValidationRow key={v.id} v={v} />
          ))}
        </ul>
      )}
    </section>
  )
}

function ValidationRow({ v }: { v: ReturnType<typeof usePendingValidations>[number] }) {
  const requester = useUserById(v.requestedById)
  return (
    <li className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CodeTag>{v.code}</CodeTag>
            <Pill tone="muted">{validationKindLabel(v.kind)}</Pill>
            <Pill tone={priorityTone(v.priority)}>{v.priority}</Pill>
          </div>
          <p className="m-0 mt-2 text-[13.5px] font-semibold text-[var(--text)]">{v.title}</p>
          <p className="m-0 mt-0.5 text-[11.5px] text-[var(--text-muted)]">
            {requester?.name ?? '—'} · {timeAgo(v.requestedAt)}
          </p>
        </div>
        <Link to="/validation" className="btn btn-ghost btn-sm shrink-0">
          Arbitrer
        </Link>
      </div>
    </li>
  )
}
