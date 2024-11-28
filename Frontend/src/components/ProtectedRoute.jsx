import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuth, role, allowedRoles }) {
  if (!isAuth || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
