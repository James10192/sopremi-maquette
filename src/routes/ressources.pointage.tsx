import { Link, createFileRoute } from '@tanstack/react-router'
import { Lock } from 'lucide-react'
import { PageHero } from '#/components/ui/PageHero'
import { EmptyState } from '#/components/ui/EmptyState'
import { PointageProgress } from '#/features/pointage/PointageProgress'
import { PointageList } from '#/features/pointage/PointageList'
import { useCan } from '#/lib/store/useCan'

export const Route = createFileRoute('/ressources/pointage')({ component: PointagePage })

function PointagePage() {
  const canPresence = useCan('staff:presence')

  if (!canPresence) {
    return (
      <main className="flex flex-col gap-5 pb-6">
        <EmptyState
          icon={Lock}
          title="Pointage en lot réservé"
          description="Seuls les rôles RH, DG et DOM peuvent saisir le pointage. Pour signaler une absence, contactez votre RH."
          action={
            <Link to="/ressources/personnel" className="btn btn-primary">
              Voir l'annuaire
            </Link>
          }
        />
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Pointage rapide"
        title={
          <>
            Pointer toute l'équipe,
            <br />
            <span className="italic">en quelques clics.</span>
          </>
        }
        description="Pour chaque agent : 5 boutons. Présent · Mission · Absent · Congé · Maladie. Toute saisie est immédiate, tracée dans l'audit, et synchronisée avec les fiches projet."
      />
      <PointageProgress />
      <PointageList />
    </main>
  )
}
