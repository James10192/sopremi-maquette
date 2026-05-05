import { CheckCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EmptyState } from '#/components/ui/EmptyState'
import { Tabs } from '#/components/ui/Tabs'
import { Bell } from 'lucide-react'
import { NotificationItem } from './NotificationItem'
import { useDispatch, useNotifications } from '#/lib/store/hooks'
import { useToast } from '#/components/ui/toast/ToastProvider'

type Filter = 'tous' | 'non_lues' | 'alert' | 'warning' | 'success' | 'info'

export function NotificationsFeed() {
  const items = useNotifications()
  const dispatch = useDispatch()
  const toast = useToast()
  const [filter, setFilter] = useState<Filter>('tous')

  const counts = {
    tous: items.length,
    non_lues: items.filter((n) => !n.read).length,
    alert: items.filter((n) => n.kind === 'alert').length,
    warning: items.filter((n) => n.kind === 'warning').length,
    success: items.filter((n) => n.kind === 'success').length,
    info: items.filter((n) => n.kind === 'info').length,
  }

  const filtered = useMemo(() => {
    if (filter === 'tous') return items
    if (filter === 'non_lues') return items.filter((n) => !n.read)
    return items.filter((n) => n.kind === filter)
  }, [filter, items])

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          active={filter}
          onChange={(v) => setFilter(v as Filter)}
          items={[
            { id: 'tous', label: 'Tous', count: counts.tous },
            { id: 'non_lues', label: 'Non lues', count: counts.non_lues },
            { id: 'alert', label: 'Alertes', count: counts.alert },
            { id: 'warning', label: 'À surveiller', count: counts.warning },
            { id: 'success', label: 'Succès', count: counts.success },
          ]}
        />
        <button
          className="btn btn-sm"
          onClick={() => {
            dispatch({ type: 'notification/read-all' })
            toast.push({ kind: 'success', title: 'Tout marqué comme lu' })
          }}
        >
          <CheckCheck className="h-3.5 w-3.5" /> Tout marquer comme lu
        </button>
      </header>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Aucune notification dans ce filtre"
          description="Affinez le filtre ou patientez — les nouveaux événements apparaissent ici en temps réel dans le produit final."
        />
      ) : (
        <div className="stagger-fast flex flex-col gap-2.5">
          {filtered.map((n) => (
            <NotificationItem key={n.id} n={n} />
          ))}
        </div>
      )}
    </section>
  )
}
