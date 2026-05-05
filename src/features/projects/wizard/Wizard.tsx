import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { useApp } from '#/lib/store/AppStore'
import { useToast } from '#/components/ui/toast/ToastProvider'
import type { Project, Validation } from '#/lib/types'
import { Stepper } from './Stepper'
import { StepIdentity } from './StepIdentity'
import { StepResources } from './StepResources'
import { StepBudget } from './StepBudget'
import { StepReview } from './StepReview'
import { EMPTY_DRAFT, type Draft } from './types'

const STEPS = [
  { id: 'identity', eyebrow: 'Étape 01', title: 'Identité du projet' },
  { id: 'resources', eyebrow: 'Étape 02', title: 'Ressources affectées' },
  { id: 'budget', eyebrow: 'Étape 03', title: 'Budget & marge' },
  { id: 'review', eyebrow: 'Étape 04', title: 'Revue & validation DG' },
]

export function Wizard() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const toast = useToast()
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const [stepIdx, setStepIdx] = useState(0)

  const isLast = stepIdx === STEPS.length - 1
  const canNext = stepValid(stepIdx, draft)

  function patch(p: Partial<Draft>) {
    setDraft((prev) => ({ ...prev, ...p }))
  }

  function submit() {
    const id = `prj-${Date.now()}`
    const code = `PRJ-${(state.projects.length + 100).toString().slice(-3)}`
    const project: Project = {
      id,
      code,
      name: draft.name,
      site: draft.site || "Mine d'ITY",
      type: draft.type || "Location d'engins + chauffeurs",
      owner: draft.owner || state.currentUser?.name || '—',
      status: 'attente_dg',
      progress: 0,
      rentability: draft.rentability,
      risk: draft.risk,
      budget: draft.budget,
      startDate: draft.startDate || new Date().toISOString().slice(0, 10),
      endDate: draft.endDate || new Date().toISOString().slice(0, 10),
      enginIds: draft.enginIds,
      staffIds: draft.staffIds,
      timeline: [
        { id: `tl-${Date.now()}`, at: new Date().toISOString(), title: 'Projet créé', tone: 'info' },
      ],
    }
    const validation: Validation = {
      id: `val-${Date.now()}`,
      code: `VAL-${(state.validations.length + 140).toString().slice(-3)}`,
      kind: 'projet',
      title: project.name,
      description: `Création du projet ${project.code} — ${project.site}. Marge cible ${draft.rentability.toFixed(1)} %. ${draft.notes || ''}`.trim(),
      requestedById: state.currentUser?.id ?? 'usr-pm',
      requestedAt: new Date().toISOString(),
      state: 'attente',
      priority: draft.risk === 'eleve' ? 'urgent' : 'normal',
    }
    dispatch({ type: 'project/create', project, validation })
    toast.push({
      kind: 'success',
      title: 'Projet créé',
      body: `${project.code} envoyé à la DG pour arbitrage.`,
    })
    navigate({ to: '/projets/$id', params: { id } })
  }

  return (
    <div className="flex flex-col gap-5">
      <Stepper steps={STEPS} currentIndex={stepIdx} onJump={setStepIdx} />

      <section className="surface min-h-[420px] rounded-2xl p-5 sm:p-7" key={stepIdx}>
        <div className="rise-in">
          {stepIdx === 0 && <StepIdentity draft={draft} onChange={patch} />}
          {stepIdx === 1 && <StepResources draft={draft} onChange={patch} />}
          {stepIdx === 2 && <StepBudget draft={draft} onChange={patch} />}
          {stepIdx === 3 && <StepReview draft={draft} />}
        </div>
      </section>

      <footer className="flex items-center justify-between">
        <button
          className="btn"
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
          disabled={stepIdx === 0}
        >
          <ArrowLeft className="h-4 w-4" /> Précédent
        </button>
        {isLast ? (
          <button className="btn btn-primary" onClick={submit} disabled={!canNext}>
            <Sparkles className="h-4 w-4" />
            Envoyer à la DG
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1))}
            disabled={!canNext}
          >
            Suivant <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </footer>
    </div>
  )
}

function stepValid(index: number, d: Draft): boolean {
  if (index === 0) return Boolean(d.name && d.site && d.type && d.startDate && d.endDate)
  if (index === 2) return d.budget > 0
  return true
}
