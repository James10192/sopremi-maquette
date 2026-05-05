import type { Role, User } from './types'

export type Capability =
  | 'validation:approve'
  | 'validation:request'
  | 'project:create'
  | 'project:edit-any'
  | 'project:edit-own'
  | 'project:status-change'
  | 'staff:manage'
  | 'staff:presence'
  | 'engin:manage'
  | 'engin:state-change'
  | 'reporting:export'

const CAPS: Record<Role, Capability[]> = {
  dg: [
    'validation:approve',
    'validation:request',
    'project:create',
    'project:edit-any',
    'project:edit-own',
    'project:status-change',
    'staff:manage',
    'staff:presence',
    'engin:manage',
    'engin:state-change',
    'reporting:export',
  ],
  rh: ['validation:request', 'staff:manage', 'staff:presence', 'reporting:export'],
  pm: ['validation:request', 'project:create', 'project:edit-own', 'reporting:export'],
  dom: [
    'validation:request',
    'project:create',
    'project:edit-any',
    'project:edit-own',
    'project:status-change',
    'staff:presence',
    'engin:manage',
    'engin:state-change',
    'reporting:export',
  ],
}

export function can(user: User | null, cap: Capability): boolean {
  if (!user) return false
  return CAPS[user.role]?.includes(cap) ?? false
}

export function ownsProject(user: User | null, ownerName: string): boolean {
  if (!user) return false
  return user.name === ownerName
}

/**
 * Visible scope of a section in the sidebar:
 *  - 'full'    → everyone sees & can act
 *  - 'read'    → user sees but cannot mutate (read-only badges)
 *  - 'hidden'  → user shouldn't see this in nav at all
 */
export function navVisibility(user: User | null, key: NavKey): 'full' | 'read' | 'hidden' {
  if (!user) return 'hidden'
  switch (key) {
    case 'cockpit':
    case 'projects':
    case 'reporting':
    case 'notifications':
      return 'full'
    case 'validation':
      // Everyone sees the queue, but only DG acts
      return user.role === 'dg' ? 'full' : 'read'
    case 'engins':
      if (user.role === 'rh') return 'read'
      return 'full'
    case 'personnel':
      if (user.role === 'pm' || user.role === 'dom') return 'read'
      return 'full'
    case 'pointage':
      // Pointage écran rapide — only roles with staff:presence can act; hidden otherwise
      if (user.role === 'pm') return 'hidden'
      return 'full'
    case 'audit':
      // Audit log — DG full, others see read-only history
      return user.role === 'dg' ? 'full' : 'read'
    default:
      return 'hidden'
  }
}

export type NavKey =
  | 'cockpit'
  | 'projects'
  | 'validation'
  | 'engins'
  | 'personnel'
  | 'pointage'
  | 'audit'
  | 'reporting'
  | 'notifications'
