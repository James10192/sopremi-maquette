import { Select } from '#/components/ui/Select'
import type { Risk, Site, ProjectType } from '#/lib/types'
import type { Draft } from './types'
import { SITES, TYPES } from './types'
import { TemplatePicker } from './TemplatePicker'

const RISK_OPTIONS = [
  { value: 'faible' as const, label: 'Faible', hint: 'aucun aléa identifié' },
  { value: 'moyen' as const, label: 'Moyen', hint: 'à surveiller' },
  { value: 'eleve' as const, label: 'Élevé', hint: 'arbitrage DG requis' },
]

export function StepIdentity({
  draft,
  onChange,
}: {
  draft: Draft
  onChange: (patch: Partial<Draft>) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <TemplatePicker onApply={onChange} />
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="label">Nom du projet</span>
        <input
          className="field mt-1.5"
          value={draft.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Ex. Extension fosse Sud — Tongon"
        />
      </label>

      <div>
        <span className="label">Site</span>
        <Select<Site>
          className="mt-1.5"
          value={draft.site}
          onChange={(v) => onChange({ site: v })}
          options={SITES.map((s) => ({ value: s, label: s }))}
          ariaLabel="Site"
        />
      </div>

      <div>
        <span className="label">Type d’opération</span>
        <Select<ProjectType>
          className="mt-1.5"
          value={draft.type}
          onChange={(v) => onChange({ type: v })}
          options={TYPES.map((t) => ({ value: t, label: t }))}
          ariaLabel="Type d’opération"
        />
      </div>

      <label>
        <span className="label">Responsable projet</span>
        <input
          className="field mt-1.5"
          value={draft.owner}
          onChange={(e) => onChange({ owner: e.target.value })}
          placeholder="Ex. Yéo Salimata"
        />
      </label>

      <div>
        <span className="label">Niveau de risque</span>
        <Select<Risk>
          className="mt-1.5"
          value={draft.risk}
          onChange={(v) => onChange({ risk: v })}
          options={RISK_OPTIONS}
          ariaLabel="Niveau de risque"
        />
      </div>

      <label>
        <span className="label">Date de démarrage</span>
        <input
          type="date"
          className="field field-mono mt-1.5"
          value={draft.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />
      </label>

      <label>
        <span className="label">Date de fin prévue</span>
        <input
          type="date"
          className="field field-mono mt-1.5"
          value={draft.endDate}
          onChange={(e) => onChange({ endDate: e.target.value })}
        />
      </label>
    </div>
    </div>
  )
}
