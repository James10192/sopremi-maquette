import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHero } from '#/components/ui/PageHero'
import { SearchInput } from '#/components/ui/SearchInput'
import { KanbanBoard } from '#/features/engins/KanbanBoard'
import { useEngins } from '#/lib/store/hooks'

export const Route = createFileRoute('/ressources/engins')({ component: EnginsPage })

function EnginsPage() {
  const engins = useEngins()
  const [search, setSearch] = useState('')

  const totals = {
    disponible: engins.filter((e) => e.state === 'disponible').length,
    affecte: engins.filter((e) => e.state === 'affecte').length,
    maintenance: engins.filter((e) => e.state === 'maintenance').length,
    panne: engins.filter((e) => e.state === 'panne').length,
  }

  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Ressources / Flotte"
        title={
          <>
            La flotte,
            <br />
            <span className="italic">vue en un coup d’œil.</span>
          </>
        }
        description="Suivez l'état des engins, leur uptime et leur consommation. Cliquez sur une carte pour la fiche complète et changer l'affectation."
        meta={
          <>
            <span className="code-tag">{engins.length} engins</span>
            <span className="code-tag">{totals.disponible} dispo</span>
            <span className="code-tag">{totals.affecte} affectés</span>
            <span className="code-tag">{totals.maintenance + totals.panne} à surveiller</span>
          </>
        }
        trailing={
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Filtrer par code, nom, marque…"
            className="w-72"
          />
        }
      />
      <KanbanBoard filter={search} />
    </main>
  )
}
