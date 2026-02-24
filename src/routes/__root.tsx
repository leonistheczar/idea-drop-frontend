import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import logo from "/main-logo.svg?url"
import IdeasHeader from '@/components/Header'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Idea Drop - Your Idea World' },
      { name: 'description', content: 'Share, explore and build on the best startup ideas and side hustles' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: logo },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-black text-gray-200 mb-2">404</h1>
      <p className="text-gray-400 text-sm mb-6">This page doesn't exist.</p>
      <a href="/" className="text-xs text-blue-600 hover:underline">← Go home</a>
    </div>
  ),
  component: () => <Outlet />,
})
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <IdeasHeader />
        <main className="bg-gray-50 min-h-[calc(100dvh-5rem)] overflow-auto">
          {children}
        </main>
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
        />
        <Scripts />
      </body>
    </html>
  )
}