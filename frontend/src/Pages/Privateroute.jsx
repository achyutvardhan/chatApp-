import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Cookies from "js-cookie";
export default function Privateroute() {
  const { IsAuthenticated } = useContext(AuthContext);
  return IsAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
