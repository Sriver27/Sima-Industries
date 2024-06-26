import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../components/context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  console.log("user", user);

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
