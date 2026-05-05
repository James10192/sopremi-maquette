import type { Draft } from './types'

export type ProjectTemplate = {
  id: string
  code: string
  label: string
  hint: string
  patch: Partial<Draft>
}

/**
 * Modèles de chantier réutilisables — pré-remplissent le wizard avec les
 * paramètres typiques d'un type d'opération SOPREMI. La saisie reste éditable.
 */
export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'forage-std',
    code: 'TPL-FOR',
    label: 'Forage pilote standard',
    hint: '7 mois · risque élevé · marge cible 22 %',
    patch: {
      type: 'Forage pilote',
      risk: 'eleve',
      rentability: 22,
      budget: 2_000_000_000,
      notes:
        "Forage pilote type SOPREMI : 1 foreuse DM45 ou Epiroc, équipe forage de 4 personnes, validation DG obligatoire avant lancement.",
    },
  },
  {
    id: 'terr-bloc',
    code: 'TPL-TER',
    label: 'Terrassement bloc complet',
    hint: '5 mois · risque moyen · marge 11 %',
    patch: {
      type: 'Terrassement',
      risk: 'moyen',
      rentability: 11,
      budget: 1_100_000_000,
      notes:
        "Terrassement multi-engins (D9R + Pelle PC400 + camion benne). Cadence visée : 1 800 m³/jour. Coordination avec HSE obligatoire.",
    },
  },
  {
    id: 'decapage',
    code: 'TPL-DEC',
    label: 'Décapage de surface',
    hint: '6 mois · risque moyen · marge 14 %',
    patch: {
      type: 'Décapage',
      risk: 'moyen',
      rentability: 14,
      budget: 950_000_000,
      notes:
        "Décapage standard avec niveleuse + chargeuse. Topographie GPS-RTK requise avant démarrage. Inclut suivi rendement quotidien.",
    },
  },
  {
    id: 'maintenance',
    code: 'TPL-MNT',
    label: 'Intervention maintenance',
    hint: '6 semaines · risque moyen · marge 8 %',
    patch: {
      type: 'Intervention planifiée',
      risk: 'moyen',
      rentability: 8,
      budget: 80_000_000,
      notes:
        "Maintenance lourde atelier : diagnostic, devis pièces, intervention, tests, livraison. Aucun engin terrain affecté.",
    },
  },
  {
    id: 'mad-operateurs',
    code: 'TPL-MAD',
    label: 'Mise à disposition opérateurs',
    hint: '5 mois · risque faible · marge 10 %',
    patch: {
      type: 'Mise à disposition opérateurs',
      risk: 'faible',
      rentability: 10,
      budget: 320_000_000,
      notes:
        "Affectation de personnel SOPREMI sur engins client. Aucun engin propre. Forfait journalier par poste, contrôle de présence quotidien.",
    },
  },
  {
    id: 'location-engins',
    code: 'TPL-LOC',
    label: "Location d'engins + chauffeurs",
    hint: '8 mois · risque faible · marge 18 %',
    patch: {
      type: "Location d'engins + chauffeurs",
      risk: 'faible',
      rentability: 18,
      budget: 1_800_000_000,
      notes:
        "Location longue durée — 2 à 4 engins lourds avec conducteurs SOPREMI. Maintenance préventive incluse. Reporting hebdomadaire.",
    },
  },
]
