import type { Engin, Project, Staff } from '#/lib/types'
import { useEngins, useProjects, useStaff } from '#/lib/store/hooks'

export type CommandResult =
  | { kind: 'project'; ref: Project; to: string; label: string; sub: string; tag: string }
  | { kind: 'engin'; ref: Engin; to: string; label: string; sub: string; tag: string }
  | { kind: 'staff'; ref: Staff; to: string; label: string; sub: string; tag: string }
  | { kind: 'page'; to: string; label: string; sub: string; tag: string }

const PAGES: Omit<Extract<CommandResult, { kind: 'page' }>, 'kind'>[] = [
  { to: '/', label: 'Cockpit', sub: 'Tableau de bord', tag: 'Page' },
  { to: '/projets', label: 'Projets', sub: 'Liste & filtres', tag: 'Page' },
  { to: '/projets/nouveau', label: 'Nouveau projet', sub: 'Wizard de création', tag: 'Page' },
  { to: '/validation', label: 'Validation DG', sub: 'File d’arbitrage', tag: 'Page' },
  { to: '/ressources/engins', label: 'Flotte', sub: 'Kanban des engins', tag: 'Page' },
  { to: '/ressources/personnel', label: 'Personnel', sub: 'Annuaire & pointage', tag: 'Page' },
  { to: '/reporting', label: 'Reporting', sub: 'Tableaux de bord', tag: 'Page' },
  { to: '/notifications', label: 'Notifications', sub: 'Journal complet', tag: 'Page' },
]

export function useCommandResults(query: string): CommandResult[] {
  const projects = useProjects()
  const engins = useEngins()
  const staff = useStaff()
  const q = query.trim().toLowerCase()

  if (!q) {
    return PAGES.map((p) => ({ kind: 'page', ...p }))
  }

  const results: CommandResult[] = []

  for (const p of projects) {
    if (`${p.name} ${p.code} ${p.site} ${p.owner}`.toLowerCase().includes(q)) {
      results.push({
        kind: 'project',
        ref: p,
        to: `/projets/${p.id}`,
        label: p.name,
        sub: `${p.site} · ${p.owner}`,
        tag: p.code,
      })
    }
  }

  for (const e of engins) {
    if (`${e.name} ${e.code} ${e.brand} ${e.type}`.toLowerCase().includes(q)) {
      results.push({
        kind: 'engin',
        ref: e,
        to: `/ressources/engins`,
        label: e.name,
        sub: `${e.brand} · ${e.type}`,
        tag: e.code,
      })
    }
  }

  for (const s of staff) {
    if (`${s.firstName} ${s.lastName} ${s.role} ${s.matricule}`.toLowerCase().includes(q)) {
      results.push({
        kind: 'staff',
        ref: s,
        to: `/ressources/personnel`,
        label: `${s.firstName} ${s.lastName}`,
        sub: s.role,
        tag: s.matricule,
      })
    }
  }

  for (const p of PAGES) {
    if (`${p.label} ${p.sub}`.toLowerCase().includes(q)) {
      results.push({ kind: 'page', ...p })
    }
  }

  return results.slice(0, 12)
}
