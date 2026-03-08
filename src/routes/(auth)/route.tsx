import { createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})
function AuthLayout() {
  return (
    <section className="flex items-center justify-center mt-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 grid sm:grid-cols-2">
        <div className="flex flex-col justify-between p-10 border-gray-100">
          <div>
            <img className="w-24 h-24" src="/main-logo.svg" alt="IdeasDrop" />
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Ideas Drop
            </h1>
            <p className="mt-2 text-md text-gray-500 leading-relaxed">
              Share, explore, and build on the best startup ideas and side
              hustles.
            </p>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} IdeasDrop
          </p>
        </div>
        <Outlet />
      </div>
    </section>
  )
}
