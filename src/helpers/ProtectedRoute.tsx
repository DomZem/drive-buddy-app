import MainTemplate from '@/components/templates/MainTemplate/MainTemplate';
import { useAuth } from '@/providers/AuthProvider';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
  const { isUserLogin } = useAuth();

  if (!isUserLogin) return <Navigate to="/" replace />;

  return (
    <MainTemplate>
      <Outlet />
    </MainTemplate>
  );
};

export default ProtectedRoute;
