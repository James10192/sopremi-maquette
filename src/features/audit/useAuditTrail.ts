import { useProjects, useValidations } from '#/lib/store/hooks'
import { useApp } from '#/lib/store/AppStore'

export type AuditEntry = {
  id: string
  at: string
  kind: 'validation' | 'project'
  action: 'approuve' | 'refuse' | 'cree' | 'statut' | 'autre'
  actorName: string | null
  title: string
  body: string
  link?: string
}

const ACTION_LABEL: Record<AuditEntry['action'], string> = {
  approuve: 'Approuvée',
  refuse: 'Refusée',
  cree: 'Créé',
  statut: 'Statut modifié',
  autre: 'Action',
}

export function actionLabel(a: AuditEntry['action']): string {
  return ACTION_LABEL[a]
}

/**
 * Construit le journal d'audit à partir du store. Les validations décidées
 * sont la source primaire. Les timeline events de chaque projet enrichissent.
 */
export function useAuditTrail(): AuditEntry[] {
  const validations = useValidations()
  const projects = useProjects()
  const { state } = useApp()

  const entries: AuditEntry[] = []

  for (const v of validations) {
    if (v.state === 'attente') continue
    const decisionUser = state.users.find((u) => u.id === v.decisionBy) ?? null
    entries.push({
      id: `v-${v.id}`,
      at: v.decisionAt ?? v.requestedAt,
      kind: 'validation',
      action: v.state === 'approuve' ? 'approuve' : 'refuse',
      actorName: decisionUser?.name ?? null,
      title: `${v.code} · ${v.title}`,
      body: v.decisionNote ?? '—',
      link: '/validation',
    })
  }

  for (const p of projects) {
    for (const ev of p.timeline) {
      entries.push({
        id: `p-${p.id}-${ev.id}`,
        at: ev.at,
        kind: 'project',
        action: ev.title.toLowerCase().includes('validé')
          ? 'approuve'
          : ev.title.toLowerCase().includes('créé')
          ? 'cree'
          : 'autre',
        actorName: p.owner,
        title: `${p.code} · ${ev.title}`,
        body: ev.body ?? `${p.name} · ${p.site}`,
        link: `/projets/${p.id}`,
      })
    }
  }

  entries.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
  return entries
}
