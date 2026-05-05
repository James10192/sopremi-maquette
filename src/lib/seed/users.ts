import type { User } from '../types'

export const seedUsers: User[] = [
  {
    id: 'usr-dg',
    name: 'Aïcha Konan',
    role: 'dg',
    initials: 'AK',
    title: 'Directrice Générale',
    email: 'a.konan@sopremi.ci',
  },
  {
    id: 'usr-rh',
    name: 'Patrice N’Goran',
    role: 'rh',
    initials: 'PN',
    title: 'Directeur des Ressources Humaines',
    email: 'p.ngoran@sopremi.ci',
  },
  {
    id: 'usr-pm',
    name: 'Yéo Salimata',
    role: 'pm',
    initials: 'YS',
    title: 'Cheffe de projet — Zone Ouest',
    email: 'y.salimata@sopremi.ci',
  },
  {
    id: 'usr-dom',
    name: 'Bamba Adama',
    role: 'dom',
    initials: 'BA',
    title: 'DOM — Direction des Opérations Minières',
    email: 'b.adama@sopremi.ci',
  },
]
