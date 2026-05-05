import type { Validation } from '../types'

export const seedValidations: Validation[] = [
  {
    id: 'val-001',
    code: 'VAL-128',
    kind: 'projet',
    title: 'Forage pilote zone Est',
    description:
      "Création du projet PRJ-038 : 7 mois, 1 foreuse DM45, équipe forage de 4 personnes. Marge prévue 22,6 %. Validation DG requise — risque géologique élevé.",
    requestedById: 'usr-pm',
    requestedAt: '2026-05-02T11:00:00',
    state: 'attente',
    priority: 'urgent',
  },
  {
    id: 'val-002',
    code: 'VAL-131',
    kind: 'personnel',
    title: 'Recrutement opérateur senior',
    description:
      'Demande RH : embauche d’un foreur senior pour Tongon. Justification : pic d’activité prévu fin Q2.',
    requestedById: 'usr-rh',
    requestedAt: '2026-05-04T07:38:00',
    state: 'attente',
    priority: 'normal',
  },
  {
    id: 'val-003',
    code: 'VAL-133',
    kind: 'site',
    title: 'Changement de site projet',
    description:
      "Le projet PRJ-021 demande un transfert temporaire d'équipements vers Lauzoua (3 jours). Coût logistique : 18 M FCFA.",
    requestedById: 'usr-dom',
    requestedAt: '2026-05-04T07:19:00',
    state: 'attente',
    priority: 'critique',
  },
  {
    id: 'val-004',
    code: 'VAL-126',
    kind: 'budget',
    title: 'Rallonge budgétaire bloc C',
    description:
      "PRJ-021 : demande de rallonge de 92 M FCFA pour absorber un dépassement carburant et heures supp. Marge ramenée à 9 %.",
    requestedById: 'usr-pm',
    requestedAt: '2026-05-03T17:00:00',
    state: 'attente',
    priority: 'urgent',
  },
  {
    id: 'val-005',
    code: 'VAL-119',
    kind: 'engin',
    title: 'Sortie de panne chargeuse 980H',
    description:
      "L'engin ENG-980H-03 est immobilisé depuis 9 jours. Devis remplacement pompe : 22 M FCFA. Validation requise.",
    requestedById: 'usr-dom',
    requestedAt: '2026-05-03T11:24:00',
    state: 'attente',
    priority: 'critique',
  },
  {
    id: 'val-006',
    code: 'VAL-115',
    kind: 'projet',
    title: 'Clôture Hiré — bilan final',
    description: 'Validation du bilan financier et clôture administrative du projet PRJ-009.',
    requestedById: 'usr-pm',
    requestedAt: '2026-02-28T18:00:00',
    state: 'approuve',
    priority: 'normal',
    decisionAt: '2026-03-01T09:00:00',
    decisionBy: 'usr-dg',
    decisionNote: 'Bilan conforme. Bravo à l’équipe.',
  },
]
