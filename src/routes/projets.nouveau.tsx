import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Lock } from 'lucide-react'
import { PageHero } from '#/components/ui/PageHero'
import { EmptyState } from '#/components/ui/EmptyState'
import { Wizard } from '#/features/projects/wizard/Wizard'
import { useCan } from '#/lib/store/useCan'

export const Route = createFileRoute('/projets/nouveau')({ component: NewProject })

function NewProject() {
  const canCreate = useCan('project:create')

  if (!canCreate) {
    return (
      <main className="flex flex-col gap-5 pb-6">
        <EmptyState
          icon={Lock}
          title="Création de projet réservée"
          description="Seuls la DG, la DOM et les chefs de projet peuvent ouvrir un nouveau dossier. Pour solliciter l'ouverture d'un chantier, contactez votre responsable."
          action={
            <Link to="/projets" className="btn btn-primary">
              Voir les projets existants
            </Link>
          }
        />
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Nouveau projet"
        title={
          <>
            Démarrez un projet,
            <br />
            <span className="italic text-[var(--ember-bright)]">étape par étape.</span>
          </>
        }
        description="Identifiez le chantier, sélectionnez les ressources, fixez le budget. La création envoie automatiquement le dossier à la DG pour validation."
        trailing={
          <Link to="/projets" className="btn">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        }
      />
      <Wizard />
    </main>
  )
}
