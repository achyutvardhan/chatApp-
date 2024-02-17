import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
export default function Privateroute() {
  const { IsAuthenticated} = useContext(AuthContext)
  let auth = { token: IsAuthenticated};
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
