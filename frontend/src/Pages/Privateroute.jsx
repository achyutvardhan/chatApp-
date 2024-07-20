import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Cookies from "js-cookie";
export default function Privateroute() {
  const { IsAuthenticated ,setIsAuthenticated } = useContext(AuthContext);
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  console.log(token , userId);
  if(token&&userId) setIsAuthenticated(true);
  return IsAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
