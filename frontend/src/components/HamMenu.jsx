import React from 'react'
import '../css/HamMenu.css'
import prf from "../assets/profile.svg"
import log from "../assets/logout.gif"
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
export default function HamMenu() {
    const {setIsAuthenticated} = useContext(AuthContext);
    const logoutUser = ()=>{
        setIsAuthenticated(false)
        console.log("logged out" )
    }
  return (
    <>
    <div className="menu-ext">
        <div className="menu-int">
            <div className="prof" id="prof-set">
                <img src={prf} alt="" width={20} height={20}/>
                <h4>profile</h4>
            </div>
            <div className="prof" id="logout" onClick={logoutUser}>
                <h4>Logout</h4>
                <img src={log} alt="" width={20} height={20}/>
            </div>
        </div>
    </div>
    </>
  )
}
