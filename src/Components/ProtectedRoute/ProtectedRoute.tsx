import { User } from "App";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  user: User;
  children: React.ReactElement;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return null;
  } else {
    return children;
  }
};

export default ProtectedRoute;
