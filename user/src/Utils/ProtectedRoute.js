import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(state=>state.auth.isAuthenticated);
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default ProtectedRoute;
