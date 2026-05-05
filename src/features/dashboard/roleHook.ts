import type { Role } from '#/lib/types'

export function roleHookLine(role: Role): string {
  switch (role) {
    case 'dg':
      return 'Arbitrer, valider, lire la marge.'
    case 'dom':
      return '14 sites, 20 engins, 186 personnes.'
    case 'pm':
      return 'Vos chantiers, vos jalons.'
    case 'rh':
      return 'Présences, certifications, équipes.'
  }
}
