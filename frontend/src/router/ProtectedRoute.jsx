import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
/** Guards authenticated routes; preserves the intended URL on redirect. */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
