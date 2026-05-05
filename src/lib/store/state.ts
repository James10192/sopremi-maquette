import type { Engin, Notification, Project, Staff, User, Validation } from '../types'
import {
  seedEngins,
  seedNotifications,
  seedProjects,
  seedStaff,
  seedUsers,
  seedValidations,
} from '../seed'

export type AppState = {
  currentUser: User | null
  users: User[]
  projects: Project[]
  engins: Engin[]
  staff: Staff[]
  validations: Validation[]
  notifications: Notification[]
}

export const initialState: AppState = {
  currentUser: null,
  users: seedUsers,
  projects: seedProjects,
  engins: seedEngins,
  staff: seedStaff,
  validations: seedValidations,
  notifications: seedNotifications,
}
