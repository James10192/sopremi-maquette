import { Link, createFileRoute } from '@tanstack/react-router'
import { Compass } from 'lucide-react'
import { ProjectDetailHeader } from '#/features/projects/detail/Header'
import { ProjectResources } from '#/features/projects/detail/Resources'
import { Timeline } from '#/features/projects/detail/Timeline'
import { StatusActions } from '#/features/projects/detail/StatusActions'
import { EmptyState } from '#/components/ui/EmptyState'
import { useProject } from '#/lib/store/hooks'

export const Route = createFileRoute('/projets/$id')({ component: ProjectDetail })

function ProjectDetail() {
  const { id } = Route.useParams()
  const project = useProject(id)

  if (!project) {
    return (
      <main className="pb-6">
        <EmptyState
          icon={Compass}
          title="Projet introuvable"
          description="Cette référence n'existe plus dans le mock store."
          action={
            <Link to="/projets" className="btn btn-primary">
              Retour aux projets
            </Link>
          }
        />
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-5 pb-6">
      <ProjectDetailHeader project={project} />
      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <ProjectResources project={project} />
          <Timeline events={project.timeline} />
        </div>
        <StatusActions project={project} />
      </div>
    </main>
  )
}
