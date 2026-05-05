export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'muted' | 'ember' | 'sea' | 'gold'

export type Role = 'dg' | 'rh' | 'pm' | 'dom'

export type User = {
  id: string
  name: string
  role: Role
  initials: string
  title: string
  email: string
}

export type Site =
  | "Mine d'ITY"
  | "Zouan-Hounien"
  | "Bonikro"
  | "Tongon"
  | "Sissingué"
  | "Yaouré"
  | "Lauzoua"
  | "Tabou"
  | "Hiré"
  | "Atelier central"

export type ProjectStatus = 'brouillon' | 'attente_dg' | 'actif' | 'pause' | 'cloture'

export type Risk = 'faible' | 'moyen' | 'eleve'

export type ProjectType =
  | "Location d'engins + chauffeurs"
  | 'Mise à disposition opérateurs'
  | 'Intervention planifiée'
  | 'Forage pilote'
  | 'Terrassement'
  | 'Décapage'

export type TimelineEvent = {
  id: string
  at: string
  title: string
  body?: string
  tone: Tone
}

export type Project = {
  id: string
  code: string
  name: string
  site: Site
  type: ProjectType
  owner: string
  status: ProjectStatus
  progress: number
  rentability: number
  risk: Risk
  budget: number
  startDate: string
  endDate: string
  enginIds: string[]
  staffIds: string[]
  timeline: TimelineEvent[]
}

export type EnginType = 'Bulldozer' | 'Pelle hydraulique' | 'Camion benne' | 'Chargeuse' | 'Foreuse' | 'Niveleuse'
export type EnginState = 'disponible' | 'affecte' | 'maintenance' | 'panne'

export type Engin = {
  id: string
  code: string
  name: string
  type: EnginType
  brand: string
  state: EnginState
  uptime: number
  fuelLevel: number
  hoursToday: number
  totalHours: number
  lastService: string
  nextService: string
  projectId: string | null
  operatorId: string | null
  recentLoad: number[]
}

export type Presence = 'present' | 'absent_justifie' | 'conge' | 'mission' | 'maladie'

export type Staff = {
  id: string
  matricule: string
  firstName: string
  lastName: string
  role: string
  department: string
  presence: Presence
  projectId: string | null
  enginId: string | null
  hireDate: string
  phone: string
  certifications: string[]
}

export type ValidationKind = 'projet' | 'personnel' | 'engin' | 'budget' | 'site'
export type ValidationState = 'attente' | 'approuve' | 'refuse'

export type Validation = {
  id: string
  code: string
  kind: ValidationKind
  title: string
  description: string
  requestedById: string
  requestedAt: string
  state: ValidationState
  priority: 'normal' | 'urgent' | 'critique'
  decisionAt?: string
  decisionBy?: string
  decisionNote?: string
}

export type Notification = {
  id: string
  at: string
  kind: 'info' | 'alert' | 'success' | 'warning'
  title: string
  body: string
  read: boolean
  link?: string
}
