import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '#/components/ui/PageHero'
import { NotificationsFeed } from '#/features/notifications/NotificationsFeed'
import { useNotifications, useUnreadCount } from '#/lib/store/hooks'

export const Route = createFileRoute('/notifications')({ component: NotificationsPage })

function NotificationsPage() {
  const total = useNotifications().length
  const unread = useUnreadCount()

  return (
    <main className="flex flex-col gap-5 pb-6">
      <PageHero
        eyebrow="Notifications"
        title={
          <>
            Le pouls
            <br />
            <span className="italic">de la production.</span>
          </>
        }
        description="Tous les événements opérationnels arrivent ici. Cliquez pour ouvrir la zone concernée. Les filtres et le marquage en lot viendront du produit final."
        meta={
          <>
            <span className="code-tag">{total} événements</span>
            <span className="code-tag">{unread} non lues</span>
          </>
        }
      />
      <NotificationsFeed />
    </main>
  )
}
