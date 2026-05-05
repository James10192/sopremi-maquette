import { useApp } from './AppStore'

export function useCurrentUser() {
  return useApp().state.currentUser
}

export function useProjects() {
  return useApp().state.projects
}

export function useProject(id: string | undefined) {
  const projects = useProjects()
  return projects.find((p) => p.id === id)
}

export function useEngins() {
  return useApp().state.engins
}

export function useStaff() {
  return useApp().state.staff
}

export function useValidations() {
  return useApp().state.validations
}

export function usePendingValidations() {
  return useValidations().filter((v) => v.state === 'attente')
}

export function useNotifications() {
  return useApp().state.notifications
}

export function useUnreadCount() {
  return useNotifications().filter((n) => !n.read).length
}

export function useDispatch() {
  return useApp().dispatch
}

export function useUserById(id?: string | null) {
  const users = useApp().state.users
  return id ? users.find((u) => u.id === id) ?? null : null
}
