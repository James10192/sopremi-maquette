import type { EnginState, Presence, ProjectStatus, Risk, Tone, ValidationKind, ValidationState } from './types'

export function projectStatusLabel(s: ProjectStatus): string {
  return {
    brouillon: 'Brouillon',
    attente_dg: 'Attente DG',
    actif: 'Actif',
    pause: 'En pause',
    cloture: 'Clôturé',
  }[s]
}

export function projectStatusTone(s: ProjectStatus): Tone {
  return {
    brouillon: 'muted',
    attente_dg: 'warning',
    actif: 'success',
    pause: 'info',
    cloture: 'muted',
  }[s] as Tone
}

export function riskLabel(r: Risk): string {
  return { faible: 'Faible', moyen: 'Moyen', eleve: 'Élevé' }[r]
}

export function riskTone(r: Risk): Tone {
  return ({ faible: 'success', moyen: 'warning', eleve: 'danger' } as const)[r]
}

export function enginStateLabel(s: EnginState): string {
  return { disponible: 'Disponible', affecte: 'Affecté', maintenance: 'Maintenance', panne: 'En panne' }[s]
}

export function enginStateTone(s: EnginState): Tone {
  return ({ disponible: 'success', affecte: 'info', maintenance: 'warning', panne: 'danger' } as const)[s]
}

export function presenceLabel(p: Presence): string {
  return {
    present: 'Présent',
    absent_justifie: 'Absent justifié',
    conge: 'En congé',
    mission: 'En mission',
    maladie: 'Maladie',
  }[p]
}

export function presenceTone(p: Presence): Tone {
  return ({
    present: 'success',
    absent_justifie: 'warning',
    conge: 'info',
    mission: 'sea',
    maladie: 'danger',
  } as const)[p]
}

export function validationKindLabel(k: ValidationKind): string {
  return { projet: 'Projet', personnel: 'Personnel', engin: 'Engin', budget: 'Budget', site: 'Site' }[k]
}

export function validationStateLabel(v: ValidationState): string {
  return { attente: 'En attente', approuve: 'Approuvé', refuse: 'Refusé' }[v]
}

export function validationStateTone(v: ValidationState): Tone {
  return ({ attente: 'warning', approuve: 'success', refuse: 'danger' } as const)[v]
}

export function priorityTone(p: 'normal' | 'urgent' | 'critique'): Tone {
  return ({ normal: 'muted', urgent: 'warning', critique: 'danger' } as const)[p]
}

export function roleLabel(r: 'dg' | 'rh' | 'pm' | 'dom'): string {
  return {
    dg: 'Direction Générale',
    rh: 'Ressources Humaines',
    pm: 'Chef de projet',
    dom: 'Direction des Opérations Minières',
  }[r]
}
