import { ReactNode } from "react";

type ProtectedRouteProps = {
  user: unknown | null;
  children: ReactNode;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (user == null) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
