import { useEngins, useProjects, useValidations } from '#/lib/store/hooks'
import type { Tone } from '#/lib/types'

export type CriticalAlert = {
  id: string
  kind: 'project' | 'validation' | 'engin'
  tone: Tone
  title: string
  detail: string
  to: string
}

export function useCriticalAlerts(): CriticalAlert[] {
  const projects = useProjects()
  const validations = useValidations()
  const engins = useEngins()
  const today = new Date()

  const alerts: CriticalAlert[] = []

  // Projets en retard (endDate dépassée et statut non clôturé)
  for (const p of projects) {
    if (p.status === 'cloture' || p.status === 'brouillon') continue
    const end = new Date(p.endDate)
    if (end < today && p.progress < 100) {
      alerts.push({
        id: `late-${p.id}`,
        kind: 'project',
        tone: 'danger',
        title: `${p.code} en retard`,
        detail: `${p.name} — fin prévue dépassée, avancement ${p.progress}%`,
        to: `/projets/${p.id}`,
      })
    }
  }

  // Demandes de validation critiques en attente
  for (const v of validations) {
    if (v.state !== 'attente' || v.priority !== 'critique') continue
    alerts.push({
      id: `crit-${v.id}`,
      kind: 'validation',
      tone: 'danger',
      title: `${v.code} critique`,
      detail: v.title,
      to: '/validation',
    })
  }

  // Engins en panne
  for (const e of engins) {
    if (e.state !== 'panne') continue
    alerts.push({
      id: `broken-${e.id}`,
      kind: 'engin',
      tone: 'warning',
      title: `${e.code} en panne`,
      detail: `${e.name} — arrêt d'exploitation`,
      to: '/ressources/engins',
    })
  }

  return alerts
}
