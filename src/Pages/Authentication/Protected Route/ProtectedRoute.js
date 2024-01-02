import React from "react";
import { useNavigate, Route, Outlet, Navigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";

const ProtectedRoute = ({ children }) => {
  const { user, setUser, userData } = useAuthenticationContext();
  const navigate = useNavigate();

  //   if (user||userData) {
  //     return <Navigate to="/login" state={{ from: navigate }} />;
  //   }

  //   return <Outlet />;

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
