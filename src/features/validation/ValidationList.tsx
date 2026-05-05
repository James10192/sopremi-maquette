import { useMemo, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Tabs } from '#/components/ui/Tabs'
import { EmptyState } from '#/components/ui/EmptyState'
import { ValidationCard } from './ValidationCard'
import { useCurrentUser, useValidations } from '#/lib/store/hooks'
import type { ValidationState } from '#/lib/types'

type Filter = ValidationState | 'tous'

export function ValidationList() {
  const validations = useValidations()
  const user = useCurrentUser()
  const [filter, setFilter] = useState<Filter>('attente')

  const counts = {
    tous: validations.length,
    attente: validations.filter((v) => v.state === 'attente').length,
    approuve: validations.filter((v) => v.state === 'approuve').length,
    refuse: validations.filter((v) => v.state === 'refuse').length,
  }

  const filtered = useMemo(() => {
    if (filter === 'tous') return validations
    return validations.filter((v) => v.state === filter)
  }, [filter, validations])

  return (
    <section className="flex flex-col gap-4">
      <Tabs
        active={filter}
        onChange={(v) => setFilter(v as Filter)}
        items={[
          { id: 'attente', label: 'En attente', count: counts.attente },
          { id: 'approuve', label: 'Approuvés', count: counts.approuve },
          { id: 'refuse', label: 'Refusés', count: counts.refuse },
          { id: 'tous', label: 'Tous', count: counts.tous },
        ]}
      />
      {filtered.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="Aucune demande dans cette file"
          description="Tout est traité. Vous pouvez consulter l'historique en basculant sur le filtre « Tous »."
        />
      ) : (
        <div className="stagger-fast flex flex-col gap-3">
          {filtered.map((v) => (
            <ValidationCard key={v.id} v={v} currentUserId={user?.id ?? 'usr-dg'} />
          ))}
        </div>
      )}
    </section>
  )
}
