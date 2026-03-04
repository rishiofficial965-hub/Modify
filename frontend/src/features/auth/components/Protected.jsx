import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom"
import Loader from "./Loading";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default Protected;