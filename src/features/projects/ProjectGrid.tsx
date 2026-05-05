import { FolderSearch } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import { EmptyState } from '#/components/ui/EmptyState'
import type { Project } from '#/lib/types'

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderSearch}
        title="Aucun projet ne correspond"
        description="Affinez la recherche ou changez le filtre. Vous pouvez aussi démarrer un nouveau projet depuis le bouton en haut à droite."
      />
    )
  }
  return (
    <div className="stagger-fast grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
