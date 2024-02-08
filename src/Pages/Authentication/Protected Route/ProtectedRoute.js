import React from "react";
import {   Navigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";

const ProtectedRoute = ({ children }) => {
  const { user,  } = useAuthenticationContext();
 


  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
