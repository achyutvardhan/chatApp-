import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
export default function Privateroute() {
  const { IsAuthenticated ,setIsAuthenticated } = useContext(AuthContext);

  return IsAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
