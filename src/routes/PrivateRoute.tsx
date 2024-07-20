import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const email = localStorage.getItem("email");

  return email ? <>{element}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
