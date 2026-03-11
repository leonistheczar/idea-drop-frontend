import { getStoredAccessToken, waitForAccessToken } from '@/lib/authToken';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
    beforeLoad: async () => {
        const token = waitForAccessToken();
        if (!token) throw redirect({ to: '/login' })
    },
    component: () => <Outlet />,
})