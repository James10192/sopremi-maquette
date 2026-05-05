import { useMemo, useState } from 'react'
import { useProjects, useStaff } from '#/lib/store/hooks'
import { StaffRow } from './StaffRow'
import { StaffDrawer } from './StaffDrawer'
import { SearchInput } from '#/components/ui/SearchInput'
import { Tabs } from '#/components/ui/Tabs'
import type { Presence, Staff } from '#/lib/types'

type Filter = Presence | 'tous'

export function StaffTable() {
  const staff = useStaff()
  const projects = useProjects()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('tous')
  const [opened, setOpened] = useState<Staff | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return staff.filter((s) => {
      if (filter !== 'tous' && s.presence !== filter) return false
      if (!q) return true
      return (
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.matricule.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q)
      )
    })
  }, [staff, filter, search])

  return (
    <section className="surface flex flex-col gap-4 rounded-2xl p-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          size="sm"
          active={filter}
          onChange={(v) => setFilter(v as Filter)}
          items={[
            { id: 'tous', label: 'Tous', count: staff.length },
            { id: 'present', label: 'Présents', count: staff.filter((s) => s.presence === 'present').length },
            { id: 'mission', label: 'En mission', count: staff.filter((s) => s.presence === 'mission').length },
            { id: 'absent_justifie', label: 'Absences', count: staff.filter((s) => s.presence === 'absent_justifie').length },
            { id: 'conge', label: 'Congés', count: staff.filter((s) => s.presence === 'conge').length },
          ]}
        />
        <SearchInput value={search} onChange={setSearch} placeholder="Rechercher un agent…" className="sm:max-w-xs" />
      </header>

      <div className="overflow-hidden rounded-xl border border-[var(--line)]">
        <table className="tbl">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Matricule</th>
              <th>Département</th>
              <th>Pointage</th>
              <th>Projet</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <StaffRow
                key={s.id}
                s={s}
                project={projects.find((p) => p.id === s.projectId)}
                onClick={() => setOpened(s)}
              />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-[var(--text-muted)]">
                  Aucun agent ne correspond aux critères.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <StaffDrawer s={opened} onClose={() => setOpened(null)} />
    </section>
  )
}
