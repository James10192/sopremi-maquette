import type { ProjectType, Risk, Site } from '#/lib/types'

export type Draft = {
  name: string
  site: Site | ''
  type: ProjectType | ''
  owner: string
  startDate: string
  endDate: string
  budget: number
  rentability: number
  risk: Risk
  enginIds: string[]
  staffIds: string[]
  notes: string
}

export const EMPTY_DRAFT: Draft = {
  name: '',
  site: '',
  type: '',
  owner: '',
  startDate: '',
  endDate: '',
  budget: 0,
  rentability: 0,
  risk: 'moyen',
  enginIds: [],
  staffIds: [],
  notes: '',
}

export const SITES: Site[] = [
  "Mine d'ITY",
  'Zouan-Hounien',
  'Bonikro',
  'Tongon',
  'Sissingué',
  'Yaouré',
  'Lauzoua',
  'Tabou',
  'Hiré',
  'Atelier central',
]

export const TYPES: ProjectType[] = [
  "Location d'engins + chauffeurs",
  'Mise à disposition opérateurs',
  'Intervention planifiée',
  'Forage pilote',
  'Terrassement',
  'Décapage',
]
