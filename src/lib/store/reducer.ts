import type { Action } from './actions'
import type { AppState } from './state'

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'state/replace':
      return action.state

    case 'auth/login': {
      const user = state.users.find((u) => u.id === action.userId) ?? null
      return { ...state, currentUser: user }
    }

    case 'auth/logout':
      return { ...state, currentUser: null }

    case 'project/create':
      return {
        ...state,
        projects: [action.project, ...state.projects],
        validations: [action.validation, ...state.validations],
      }

    case 'project/update':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.id ? { ...p, ...action.patch } : p,
        ),
      }

    case 'project/status':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.id ? { ...p, status: action.status } : p,
        ),
      }

    case 'project/assign-engin':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, enginIds: Array.from(new Set([...p.enginIds, action.enginId])) }
            : p,
        ),
        engins: state.engins.map((e) =>
          e.id === action.enginId
            ? { ...e, projectId: action.projectId, state: 'affecte' }
            : e,
        ),
      }

    case 'project/unassign-engin':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, enginIds: p.enginIds.filter((id) => id !== action.enginId) }
            : p,
        ),
        engins: state.engins.map((e) =>
          e.id === action.enginId ? { ...e, projectId: null, state: 'disponible' } : e,
        ),
      }

    case 'project/assign-staff':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, staffIds: Array.from(new Set([...p.staffIds, action.staffId])) }
            : p,
        ),
        staff: state.staff.map((s) =>
          s.id === action.staffId ? { ...s, projectId: action.projectId } : s,
        ),
      }

    case 'project/unassign-staff':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.projectId
            ? { ...p, staffIds: p.staffIds.filter((id) => id !== action.staffId) }
            : p,
        ),
        staff: state.staff.map((s) =>
          s.id === action.staffId ? { ...s, projectId: null } : s,
        ),
      }

    case 'engin/state':
      return {
        ...state,
        engins: state.engins.map((e) =>
          e.id === action.id ? { ...e, state: action.state } : e,
        ),
      }

    case 'staff/presence':
      return {
        ...state,
        staff: state.staff.map((s) =>
          s.id === action.id ? { ...s, presence: action.presence } : s,
        ),
      }

    case 'validation/approve':
      return {
        ...state,
        validations: state.validations.map((v) =>
          v.id === action.id
            ? {
                ...v,
                state: 'approuve',
                decisionAt: new Date().toISOString(),
                decisionBy: action.userId,
                decisionNote: action.note,
              }
            : v,
        ),
      }

    case 'validation/reject':
      return {
        ...state,
        validations: state.validations.map((v) =>
          v.id === action.id
            ? {
                ...v,
                state: 'refuse',
                decisionAt: new Date().toISOString(),
                decisionBy: action.userId,
                decisionNote: action.note,
              }
            : v,
        ),
      }

    case 'validation/create':
      return { ...state, validations: [action.validation, ...state.validations] }

    case 'notification/push':
      return { ...state, notifications: [action.notification, ...state.notifications] }

    case 'notification/read':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n,
        ),
      }

    case 'notification/read-all':
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }

    default:
      return state
  }
}
