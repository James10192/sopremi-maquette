import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { CodeTag } from '#/components/ui/CodeTag'
import { useToast } from '#/components/ui/toast/ToastProvider'
import { PROJECT_TEMPLATES } from './templates'
import type { Draft } from './types'

export function TemplatePicker({ onApply }: { onApply: (patch: Partial<Draft>) => void }) {
  const [open, setOpen] = useState(false)
  const toast = useToast()

  function pick(id: string) {
    const tpl = PROJECT_TEMPLATES.find((t) => t.id === id)
    if (!tpl) return
    onApply(tpl.patch)
    toast.push({
      kind: 'info',
      title: 'Modèle chargé',
      body: `${tpl.label} — type, risque, marge et budget cible pré-remplis. Vous pouvez tout modifier.`,
      ttl: 3500,
    })
    setOpen(false)
  }

  return (
    <div className="rounded-xl border border-[rgba(255,130,0,0.22)] bg-[rgba(255,130,0,0.05)] p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="m-0 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.20em] text-[var(--ember-bright)]">
            <Sparkles className="h-3.5 w-3.5" /> Démarrage rapide
          </p>
          <p className="m-0 mt-1 text-[12.5px] text-[var(--text-soft)]">
            Charger un <span className="font-semibold text-[var(--text)]">modèle de chantier</span> SOPREMI pour
            pré-remplir le wizard. La saisie reste éditable.
          </p>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="btn btn-sm">
          {open ? 'Masquer' : 'Choisir un modèle'}
        </button>
      </div>

      {open && (
        <div className="stagger-fast mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => pick(t.id)}
              className="group rounded-lg border border-[var(--line)] bg-[rgba(255,255,255,0.025)] p-3 text-left transition hover:-translate-y-0.5 hover:border-[rgba(255,130,0,0.32)] hover:bg-[rgba(255,130,0,0.08)]"
            >
              <CodeTag>{t.code}</CodeTag>
              <p className="m-0 mt-2 text-[13px] font-semibold text-[var(--text)] group-hover:text-[var(--ember-bright)]">
                {t.label}
              </p>
              <p className="font-tech m-0 mt-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {t.hint}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
