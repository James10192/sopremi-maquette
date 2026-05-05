import { useState } from 'react'
import { EnginCard } from './EnginCard'
import { EnginColumn } from './EnginColumn'
import { EnginDrawer } from './EnginDrawer'
import { useEngins } from '#/lib/store/hooks'
import type { Engin } from '#/lib/types'

export function KanbanBoard({ filter }: { filter: string }) {
  const engins = useEngins()
  const [opened, setOpened] = useState<Engin | null>(null)
  const q = filter.trim().toLowerCase()

  const match = (e: Engin) =>
    !q ||
    e.name.toLowerCase().includes(q) ||
    e.code.toLowerCase().includes(q) ||
    e.brand.toLowerCase().includes(q) ||
    e.type.toLowerCase().includes(q)

  const groups = {
    disponible: engins.filter((e) => e.state === 'disponible' && match(e)),
    affecte: engins.filter((e) => e.state === 'affecte' && match(e)),
    maintenance: engins.filter((e) => e.state === 'maintenance' && match(e)),
    panne: engins.filter((e) => e.state === 'panne' && match(e)),
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <EnginColumn title="Disponibles" count={groups.disponible.length} tone="success">
          {groups.disponible.map((e) => (
            <EnginCard key={e.id} engin={e} onClick={() => setOpened(e)} />
          ))}
        </EnginColumn>
        <EnginColumn title="Affectés" count={groups.affecte.length} tone="info">
          {groups.affecte.map((e) => (
            <EnginCard key={e.id} engin={e} onClick={() => setOpened(e)} />
          ))}
        </EnginColumn>
        <EnginColumn title="Maintenance" count={groups.maintenance.length} tone="warning">
          {groups.maintenance.map((e) => (
            <EnginCard key={e.id} engin={e} onClick={() => setOpened(e)} />
          ))}
        </EnginColumn>
        <EnginColumn title="En panne" count={groups.panne.length} tone="danger">
          {groups.panne.map((e) => (
            <EnginCard key={e.id} engin={e} onClick={() => setOpened(e)} />
          ))}
        </EnginColumn>
      </div>
      <EnginDrawer engin={opened} onClose={() => setOpened(null)} />
    </>
  )
}
