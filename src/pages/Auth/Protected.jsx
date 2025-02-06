import React, { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../../Validator.js"; 
import { toast } from "react-toastify";

const Protected = () => {
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = token && isTokenValid(token);
  const toastShown = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !toastShown.current) {
      toast.warning("Please Login ", { autoClose: 1500 });
      toastShown.current = true;
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
