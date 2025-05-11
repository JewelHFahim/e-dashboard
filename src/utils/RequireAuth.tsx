// components/RequireAuth.tsx
import Cookies from "js-cookie";
import { ReactNode } from "react";
import { Navigate } from "react-router";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const token = Cookies.get("pencil_DB_Token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
