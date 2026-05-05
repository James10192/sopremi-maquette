import { can, ownsProject, type Capability } from '../permissions'
import { useCurrentUser } from './hooks'

export function useCan(cap: Capability): boolean {
  const user = useCurrentUser()
  return can(user, cap)
}

export function useOwnsProject(ownerName: string): boolean {
  const user = useCurrentUser()
  return ownsProject(user, ownerName)
}
