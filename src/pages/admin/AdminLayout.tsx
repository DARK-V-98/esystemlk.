import { ReactNode } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';
import { Skeleton } from '../../components/ui/skeleton';
import { Header } from '../../components/layout/Header';

const AdminLayout = () => {
  const { user, loading } = useAuth();
  const allowedRoles = ['admin', 'developer'];

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <Skeleton className="h-24 w-full mb-10 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
