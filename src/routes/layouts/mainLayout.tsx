import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/layouts/mainLayout')({
  component: MainLayout,
})

export function MainLayout() {
  return (
    <main className='bg-gray-50 min-h-screen'>
      <Outlet />
    </main>
  )
}
export default MainLayout;