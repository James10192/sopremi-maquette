import { Pill } from '#/components/ui/Pill'
import { CodeTag } from '#/components/ui/CodeTag'
import { formatPercent, formatXOF, formatDate } from '#/lib/format'
import { riskLabel, riskTone } from '#/lib/labels'
import { useEngins, useStaff } from '#/lib/store/hooks'
import type { Draft } from './types'

export function StepReview({ draft }: { draft: Draft }) {
  const engins = useEngins().filter((e) => draft.enginIds.includes(e.id))
  const staff = useStaff().filter((s) => draft.staffIds.includes(s.id))

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <article className="surface-soft rounded-2xl p-5">
        <p className="eyebrow m-0">Récapitulatif</p>
        <h3 className="font-display m-0 mt-2 text-[1.6rem] font-semibold leading-tight tracking-tight text-[var(--text)]">
          {draft.name || 'Projet sans nom'}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {draft.site && <CodeTag>{draft.site}</CodeTag>}
          {draft.type && <Pill tone="muted">{draft.type}</Pill>}
          <Pill tone={riskTone(draft.risk)}>Risque {riskLabel(draft.risk)}</Pill>
        </div>
        <p className="mt-3 mb-0 text-[13px] leading-7 text-[var(--text-soft)]">
          {draft.notes || 'Aucune note ajoutée.'}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-[12.5px]">
          <Field label="Responsable" value={draft.owner || '—'} />
          <Field label="Démarrage" value={draft.startDate ? formatDate(draft.startDate) : '—'} />
          <Field label="Fin prévue" value={draft.endDate ? formatDate(draft.endDate) : '—'} />
          <Field label="Marge cible" value={formatPercent(draft.rentability, true)} accent />
          <Field label="Budget" value={formatXOF(draft.budget || 0)} mono />
          <Field
            label="Ressources"
            value={`${draft.enginIds.length} engins · ${draft.staffIds.length} pers.`}
            mono
          />
        </dl>
      </article>

      <article className="surface-soft rounded-2xl p-5">
        <p className="eyebrow m-0">Validation DG</p>
        <p className="m-0 mt-2 text-[13.5px] leading-7 text-[var(--text-soft)]">
          Le projet sera créé en statut <span className="font-semibold text-[var(--warning-soft)]">Attente DG</span>.
          Un dossier d’arbitrage est ajouté à la file de validation et la DG reçoit une notification.
        </p>

        <div className="rule my-4" />

        <p className="label m-0 mb-2">Engins sélectionnés</p>
        {engins.length === 0 ? (
          <p className="m-0 text-[12.5px] text-[var(--text-muted)]">Aucun engin pour le moment.</p>
        ) : (
          <ul className="flex flex-wrap gap-1.5">
            {engins.map((e) => (
              <li key={e.id}><CodeTag>{e.code}</CodeTag></li>
            ))}
          </ul>
        )}

        <p className="label m-0 mb-2 mt-4">Personnel affecté</p>
        {staff.length === 0 ? (
          <p className="m-0 text-[12.5px] text-[var(--text-muted)]">Aucun personnel sélectionné.</p>
        ) : (
          <ul className="flex flex-wrap gap-1.5">
            {staff.map((s) => (
              <li key={s.id}><CodeTag>{s.matricule}</CodeTag></li>
            ))}
          </ul>
        )}
      </article>
    </div>
  )
}

function Field({ label, value, accent, mono }: { label: string; value: React.ReactNode; accent?: boolean; mono?: boolean }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-2.5">
      <dt className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</dt>
      <dd className={`m-0 mt-1 ${mono ? 'font-tech tabular' : ''} text-[13px] font-semibold ${accent ? 'text-[var(--success-soft)]' : 'text-[var(--text)]'}`}>
        {value}
      </dd>
    </div>
  )
}
