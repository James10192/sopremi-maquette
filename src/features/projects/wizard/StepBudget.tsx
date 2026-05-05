import { formatXOF } from '#/lib/format'
import type { Draft } from './types'

export function StepBudget({
  draft,
  onChange,
}: {
  draft: Draft
  onChange: (patch: Partial<Draft>) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label>
        <span className="label">Budget prévisionnel (FCFA)</span>
        <input
          type="number"
          inputMode="numeric"
          className="field field-mono mt-1.5"
          value={draft.budget || ''}
          onChange={(e) => onChange({ budget: Number(e.target.value) || 0 })}
          placeholder="Ex. 1240000000"
        />
        <span className="mt-1 inline-block text-[11.5px] text-[var(--text-muted)]">
          Aperçu : <span className="font-tech text-[var(--text-soft)]">{formatXOF(draft.budget || 0)}</span>
        </span>
      </label>

      <label>
        <span className="label">Marge cible</span>
        <div className="mt-1.5 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={40}
            step={0.5}
            value={draft.rentability}
            onChange={(e) => onChange({ rentability: Number(e.target.value) })}
            className="flex-1 accent-[var(--ember)]"
          />
          <span className="font-tech tabular text-[14px] font-semibold text-[var(--ember-bright)]">
            +{draft.rentability.toFixed(1)} %
          </span>
        </div>
      </label>

      <label className="sm:col-span-2">
        <span className="label">Notes & contexte</span>
        <textarea
          className="field mt-1.5 min-h-[110px] resize-y"
          value={draft.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Justificatif, contexte client, contraintes terrain, livrables attendus…"
        />
      </label>
    </div>
  )
}
