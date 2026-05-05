import type { Role } from '#/lib/types'

export type DashboardPreset = {
  greetingTitle: string
  primaryCta: { to: string; label: string }
  secondaryCta?: { to: string; label: string }
  showActiveProjects: boolean
  showFleetSnapshot: boolean
  showValidationPulse: boolean
  showActivityFeed: boolean
  showPipeline: boolean
  showPresenceSummary: boolean
}

const BASE: DashboardPreset = {
  greetingTitle: '',
  primaryCta: { to: '/projets', label: 'Ouvrir les projets' },
  showActiveProjects: true,
  showFleetSnapshot: true,
  showValidationPulse: true,
  showActivityFeed: true,
  showPipeline: false,
  showPresenceSummary: false,
}

export function presetFor(role: Role): DashboardPreset {
  switch (role) {
    case 'dg':
      return {
        ...BASE,
        primaryCta: { to: '/validation', label: 'Arbitrer les demandes' },
        secondaryCta: { to: '/reporting', label: 'Reporting consolidé' },
        showActiveProjects: true,
        showFleetSnapshot: false,
        showValidationPulse: true,
        showActivityFeed: true,
        showPipeline: true,
        showPresenceSummary: false,
      }
    case 'dom':
      return {
        ...BASE,
        primaryCta: { to: '/projets/nouveau', label: 'Démarrer un projet' },
        secondaryCta: { to: '/ressources/engins', label: 'Voir la flotte' },
        showActiveProjects: true,
        showFleetSnapshot: true,
        showValidationPulse: true,
        showActivityFeed: true,
        showPipeline: true,
        showPresenceSummary: false,
      }
    case 'pm':
      return {
        ...BASE,
        primaryCta: { to: '/projets/nouveau', label: 'Soumettre un projet' },
        secondaryCta: { to: '/projets', label: 'Mes projets' },
        showActiveProjects: true,
        showFleetSnapshot: false,
        showValidationPulse: true,
        showActivityFeed: true,
        showPipeline: true,
        showPresenceSummary: false,
      }
    case 'rh':
      return {
        ...BASE,
        primaryCta: { to: '/ressources/personnel', label: 'Pointer / consulter' },
        secondaryCta: { to: '/notifications', label: 'Notifications RH' },
        showActiveProjects: false,
        showFleetSnapshot: false,
        showValidationPulse: true,
        showActivityFeed: true,
        showPipeline: false,
        showPresenceSummary: true,
      }
  }
}
