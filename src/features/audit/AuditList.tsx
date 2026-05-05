import { useMemo, useState } from 'react'
import { History } from 'lucide-react'
import { EmptyState } from '#/components/ui/EmptyState'
import { SearchInput } from '#/components/ui/SearchInput'
import { Tabs } from '#/components/ui/Tabs'
import { AuditEntryRow } from './AuditEntry'
import { useAuditTrail, type AuditEntry } from './useAuditTrail'

type Filter = AuditEntry['action'] | 'tous'

export function AuditList() {
  const entries = useAuditTrail()
  const [filter, setFilter] = useState<Filter>('tous')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return entries.filter((e) => {
      if (filter !== 'tous' && e.action !== filter) return false
      if (!q) return true
      return (
        e.title.toLowerCase().includes(q) ||
        e.body.toLowerCase().includes(q) ||
        (e.actorName?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [entries, filter, search])

  const counts = {
    tous: entries.length,
    approuve: entries.filter((e) => e.action === 'approuve').length,
    refuse: entries.filter((e) => e.action === 'refuse').length,
    cree: entries.filter((e) => e.action === 'cree').length,
    autre: entries.filter((e) => e.action === 'autre').length,
  }

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          size="sm"
          active={filter}
          onChange={(v) => setFilter(v as Filter)}
          items={[
            { id: 'tous', label: 'Tout', count: counts.tous },
            { id: 'approuve', label: 'Approuvées', count: counts.approuve },
            { id: 'refuse', label: 'Refusées', count: counts.refuse },
            { id: 'cree', label: 'Créations', count: counts.cree },
            { id: 'autre', label: 'Autres', count: counts.autre },
          ]}
        />
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Chercher un code, un acteur, un motif…"
          className="sm:max-w-xs"
        />
      </header>

      {filtered.length === 0 ? (
        <EmptyState
          icon={History}
          title="Aucune entrée dans cette vue"
          description="Affinez le filtre ou la recherche. L'audit consigne automatiquement toute approbation, refus, création de projet et changement de statut."
        />
      ) : (
        <ul className="stagger-fast flex flex-col gap-2">
          {filtered.map((e) => (
            <AuditEntryRow key={e.id} entry={e} />
          ))}
        </ul>
      )}
    </section>
  )
}
