import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PrivateRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // For general protected routes
  if (isAdmin) {
    return <Navigate to="/admin-panel" />;
  }

  return <Outlet />;
};

export const AdminRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Check if the user is authenticated and an admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

