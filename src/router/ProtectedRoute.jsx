import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const isAuthenticated =
  //   sessionStorage.getItem("accessToken") &&
  //   sessionStorage.getItem("refreshToken");

  // if (!isAuthenticated) {
  //   localStorage.removeItem("isSplash");
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default ProtectedRoute;
