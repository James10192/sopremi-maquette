import {
  BarChart3,
  Bell,
  ClipboardCheck,
  HardHat,
  History,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NavKey } from '#/lib/permissions'

export type NavLinkSpec = {
  to: string
  label: string
  icon: LucideIcon
  match?: 'exact' | 'prefix'
  key: NavKey
}

export type NavGroup = {
  title: string
  items: NavLinkSpec[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Pilotage',
    items: [
      { to: '/', label: 'Cockpit', icon: LayoutDashboard, match: 'exact', key: 'cockpit' },
      { to: '/projets', label: 'Projets', icon: MapPinned, match: 'prefix', key: 'projects' },
      { to: '/validation', label: 'Validation DG', icon: ShieldCheck, match: 'prefix', key: 'validation' },
      { to: '/audit', label: 'Audit & historique', icon: History, match: 'prefix', key: 'audit' },
    ],
  },
  {
    title: 'Ressources',
    items: [
      { to: '/ressources/engins', label: 'Flotte', icon: Truck, match: 'prefix', key: 'engins' },
      { to: '/ressources/personnel', label: 'Personnel', icon: HardHat, match: 'prefix', key: 'personnel' },
      { to: '/ressources/pointage', label: 'Pointage rapide', icon: ClipboardCheck, match: 'prefix', key: 'pointage' },
    ],
  },
  {
    title: 'Reporting',
    items: [
      { to: '/reporting', label: 'Tableaux de bord', icon: BarChart3, match: 'prefix', key: 'reporting' },
      { to: '/notifications', label: 'Notifications', icon: Bell, match: 'prefix', key: 'notifications' },
    ],
  },
]
