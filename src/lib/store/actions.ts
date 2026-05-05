import type {
  EnginState,
  Notification,
  Presence,
  Project,
  ProjectStatus,
  Validation,
} from '../types'

export type Action =
  | { type: 'auth/login'; userId: string }
  | { type: 'auth/logout' }
  | { type: 'project/create'; project: Project; validation: Validation }
  | { type: 'project/update'; id: string; patch: Partial<Project> }
  | { type: 'project/status'; id: string; status: ProjectStatus }
  | { type: 'project/assign-engin'; projectId: string; enginId: string }
  | { type: 'project/unassign-engin'; projectId: string; enginId: string }
  | { type: 'project/assign-staff'; projectId: string; staffId: string }
  | { type: 'project/unassign-staff'; projectId: string; staffId: string }
  | { type: 'engin/state'; id: string; state: EnginState }
  | { type: 'staff/presence'; id: string; presence: Presence }
  | { type: 'validation/approve'; id: string; userId: string; note?: string }
  | { type: 'validation/reject'; id: string; userId: string; note?: string }
  | { type: 'validation/create'; validation: Validation }
  | { type: 'notification/push'; notification: Notification }
  | { type: 'notification/read'; id: string }
  | { type: 'notification/read-all' }
  | { type: 'state/replace'; state: import('./state').AppState }
