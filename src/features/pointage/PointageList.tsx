import { useMemo, useState } from 'react'
import { Tabs } from '#/components/ui/Tabs'
import { SearchInput } from '#/components/ui/SearchInput'
import { useStaff } from '#/lib/store/hooks'
import type { Presence } from '#/lib/types'
import { PointageRow } from './PointageRow'

type Filter = Presence | 'tous'

export function PointageList() {
  const staff = useStaff()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('tous')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return staff.filter((s) => {
      if (filter !== 'tous' && s.presence !== filter) return false
      if (!q) return true
      return (
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.matricule.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q)
      )
    })
  }, [staff, search, filter])

  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          size="sm"
          active={filter}
          onChange={(v) => setFilter(v as Filter)}
          items={[
            { id: 'tous', label: 'Tous', count: staff.length },
            { id: 'present', label: 'Présents', count: staff.filter((s) => s.presence === 'present').length },
            { id: 'mission', label: 'Mission', count: staff.filter((s) => s.presence === 'mission').length },
            { id: 'absent_justifie', label: 'Absents', count: staff.filter((s) => s.presence === 'absent_justifie').length },
            { id: 'conge', label: 'Congés', count: staff.filter((s) => s.presence === 'conge').length },
            { id: 'maladie', label: 'Maladie', count: staff.filter((s) => s.presence === 'maladie').length },
          ]}
        />
        <SearchInput value={search} onChange={setSearch} placeholder="Filtrer un agent…" className="sm:max-w-xs" />
      </header>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-6 text-center text-[13px] text-[var(--text-muted)]">
          Aucun agent ne correspond.
        </p>
      ) : (
        <ul className="stagger-fast flex flex-col gap-1.5">
          {filtered.map((s) => (
            <PointageRow key={s.id} s={s} />
          ))}
        </ul>
      )}
    </section>
  )
}
