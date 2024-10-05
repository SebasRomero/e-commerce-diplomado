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
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show a loading indicator while determining authentication state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with your loading spinner or component
  }

  // Check if the user is authenticated and an admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin-panel/product" />;
  }

  return <Outlet />;
};
