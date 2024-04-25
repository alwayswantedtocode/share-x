import React, { useEffect, useState } from "react";
import {   Navigate, useLocation } from "react-router-dom";
import { useAuthenticationContext } from "../ContextApi/AuthenticationContext";
import axios from "../API/axios";
import {useSelector} from "react-redux"

const ProtectedRoute = ({ children }) => {
  const { AuthUser,  } = useAuthenticationContext();
  const [isVerified, setIsVerified] = useState(false);
  const {currentUser}=useSelector((state)=>state.auth)
  const location = useLocation()

  //  useEffect(() => {
  //    const verifyToken = async () => {
  //      try {
  //        const response = await axios.get("/api/users/checkauthentication", {
  //          withCredentials: true, 
  //        });
  //        if (response.status === 200) {
  //          setIsVerified(true);
  //        }
  //      } catch (error) {
  //        console.error(error);
  //      }
  //    };
  //    verifyToken();
  //  }, [AuthUser]);


  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
