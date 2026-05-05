import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProjectFilters, type StatusFilter } from '#/features/projects/ProjectFilters'
import { ProjectGrid } from '#/features/projects/ProjectGrid'
import { PageHero } from '#/components/ui/PageHero'
import { useCurrentUser, useProjects } from '#/lib/store/hooks'
import { useCan } from '#/lib/store/useCan'

export const Route = createFileRoute('/projets/')({ component: ProjectsList })

function ProjectsList() {
  const user = useCurrentUser()
  const projects = useProjects()
  const canCreate = useCan('project:create')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('tous')
  const [scope, setScope] = useState<'all' | 'mine'>(user?.role === 'pm' ? 'mine' : 'all')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return projects.filter((p) => {
      if (scope === 'mine' && p.owner !== user?.name) return false
      if (status !== 'tous' && p.status !== status) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.site.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q)
      )
    })
  }, [projects, search, status, scope, user])

  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Projets"
        title={
          <>
            <span className="text-[var(--text-soft)]">Pilotage</span>{' '}
            <span className="italic">des chantiers actifs.</span>
          </>
        }
        description="Chaque projet rassemble un site, une équipe, une flotte d'engins et un cadre financier. Filtrez, ouvrez, ajustez."
        trailing={
          canCreate ? (
            <Link to="/projets/nouveau" className="btn btn-primary">
              <Plus className="h-4 w-4" />
              Nouveau projet
            </Link>
          ) : null
        }
        meta={
          <>
            <span className="code-tag">{projects.length} projets</span>
            <span className="code-tag">{projects.filter((p) => p.status === 'actif').length} actifs</span>
            <span className="code-tag">
              {projects.filter((p) => p.status === 'attente_dg').length} en attente DG
            </span>
          </>
        }
      />

      {user?.role === 'pm' && (
        <div className="surface-flat inline-flex w-fit items-center gap-1 rounded-lg p-1">
          <button
            onClick={() => setScope('mine')}
            className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition ${
              scope === 'mine'
                ? 'bg-[rgba(255,130,0,0.16)] text-[#ffd19a]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Mes projets
          </button>
          <button
            onClick={() => setScope('all')}
            className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition ${
              scope === 'all'
                ? 'bg-[rgba(255,130,0,0.16)] text-[#ffd19a]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Tous les projets
          </button>
        </div>
      )}

      <ProjectFilters
        search={search}
        onSearch={setSearch}
        status={status}
        onStatus={setStatus}
        projects={scope === 'mine' ? projects.filter((p) => p.owner === user?.name) : projects}
      />

      <ProjectGrid projects={filtered} />
    </main>
  )
}
