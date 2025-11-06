import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "App";

type ProtectedRouteProps = {
  user: User | null;
  requiredRole?: string;
  children: React.ReactElement;
};

const ProtectedRoute = ({
  user,
  requiredRole,
  children,
}: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/");
      return;
    }

    // Redirect if role doesn't match
    if (requiredRole && user.role !== requiredRole) {
      navigate("/");
    }
  }, [user, requiredRole, navigate]);

  // While redirecting or unauthorized, render nothing
  if (!user || (requiredRole && user.role !== requiredRole)) return null;

  // Authorized → render the protected content
  return children;
};

export default ProtectedRoute;
