import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Regular users are not allowed on admin routes
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin) {
    return <Navigate to="/admin-panel" />;
  }

  return <Outlet />;
};

export const AdminRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Admins are not allowed on regular user routes
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
