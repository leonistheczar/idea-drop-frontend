import { HeadContent, Outlet, Scripts, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../styles.css?url'
import logo from "/main-logo.svg?url"
import IdeasHeader from '@/components/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
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
  errorComponent: ({ error, reset }) => <RootErrorComponent error={error} reset={reset} />,
  component: () => <RootComponent />,
})

function RootErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-black text-gray-200 mb-2">Oops!</h1>
      <p className="text-gray-600 text-base font-medium mb-1">Something went wrong</p>
      <p className="text-gray-400 text-sm mb-8 max-w-sm">
        {error?.message ?? 'An unexpected error occurred. Please try again.'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => {
            reset()
            router.invalidate()
          }}
          className="text-xs bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
        <a
          href="/"
          className="text-xs border border-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          ← Go home
        </a>
      </div>
    </div>
  )
}

function RootComponent(){
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}

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
          plugins={
            [{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
             { name: 'Tanstack Query', render: <ReactQueryDevtools /> }]}
          />
        <Scripts />
      </body>
    </html>
  )
}