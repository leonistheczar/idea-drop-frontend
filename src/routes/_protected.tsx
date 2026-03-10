import { useAuth } from '@/context/authContext';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect, } from 'react';

export const Route = createFileRoute('/_protected')({
  component: ProtectedRoute,
})

function ProtectedRoute() {
    const {user, authLoading} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!authLoading && !user){
            navigate({to:"/login"});
        }
    }, [user, authLoading]);
  return (
    <Outlet />
  );
}
