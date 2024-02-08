import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'
export default function Privateroute() {

  let auth = {'token': true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}
