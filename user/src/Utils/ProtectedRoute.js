import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        console.log("ProtectedRoute - isLoggedIn:", isLoggedIn);
    }, [isLoggedIn]);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
