import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";  

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If no user block access
  if (!user || (role && user.role !== role)) {
    return <Navigate to="/" />;
  }

// allow access
  return children;
};

export default ProtectedRoute;
