import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Footer } from '#/components/shell/Footer'
import { Header } from '#/components/shell/Header'
import { AppShell } from '#/components/shell/AppShell'
import { AppStoreProvider } from '#/lib/store/AppStore'
import { ToastProvider } from '#/components/ui/toast/ToastProvider'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: 'SOPREMI Forge — cockpit opérationnel des projets miniers, des engins, du personnel et de la validation DG.',
      },
      { title: 'SOPREMI Forge · Cockpit opérationnel' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/brand/sopremi-icon.png' },
      { rel: 'apple-touch-icon', href: '/brand/sopremi-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere]">
        <AppStoreProvider>
          <ToastProvider>
            <Header />
            <AppShell>{children ?? <Outlet />}</AppShell>
            <Footer />
          </ToastProvider>
        </AppStoreProvider>
        <Scripts />
      </body>
    </html>
  )
}
