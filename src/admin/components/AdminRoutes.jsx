import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { useAdmin } from '../context/AdminContext';

function AdminRoutes({ children }) {
  const { isAuthenticated, loading } = useAdmin();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50">
        <div className="w-10 h-10 border-4 border-navy-200 border-t-navy-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <AdminLayout>{children || <Outlet />}</AdminLayout>;
}

export default AdminRoutes;
