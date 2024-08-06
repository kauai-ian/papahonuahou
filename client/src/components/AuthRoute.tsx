import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

type AuthRouteProps = {
  children: React.ReactNode;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
