import { Tabs } from '#/components/ui/Tabs'
import { SearchInput } from '#/components/ui/SearchInput'
import type { ProjectStatus } from '#/lib/types'
import type { Project } from '#/lib/types'

export type StatusFilter = ProjectStatus | 'tous'

type Props = {
  search: string
  onSearch: (v: string) => void
  status: StatusFilter
  onStatus: (s: StatusFilter) => void
  projects: Project[]
}

export function ProjectFilters({ search, onSearch, status, onStatus, projects }: Props) {
  const counts = {
    tous: projects.length,
    actif: projects.filter((p) => p.status === 'actif').length,
    attente_dg: projects.filter((p) => p.status === 'attente_dg').length,
    pause: projects.filter((p) => p.status === 'pause').length,
    brouillon: projects.filter((p) => p.status === 'brouillon').length,
    cloture: projects.filter((p) => p.status === 'cloture').length,
  }

  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Tabs
        active={status}
        onChange={(s) => onStatus(s as StatusFilter)}
        items={[
          { id: 'tous', label: 'Tous', count: counts.tous },
          { id: 'actif', label: 'Actifs', count: counts.actif },
          { id: 'attente_dg', label: 'Attente DG', count: counts.attente_dg },
          { id: 'pause', label: 'Pause', count: counts.pause },
          { id: 'brouillon', label: 'Brouillons', count: counts.brouillon },
          { id: 'cloture', label: 'Clôturés', count: counts.cloture },
        ]}
      />
      <SearchInput
        value={search}
        onChange={onSearch}
        placeholder="Rechercher un projet, un site, un code…"
        className="sm:max-w-xs"
      />
    </div>
  )
}
