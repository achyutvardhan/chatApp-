import React, { useState } from "react";
import "../css/HamMenu.css";
import prf from "../assets/profile.svg";
import log from "../assets/logout.gif";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import ProfileSetting from "./ProfileSetting";
import Cookies from "js-cookie"
import { toast } from 'react-toastify'; // import toast

export default function HamMenu() {
  const [setting, Setsetting] = useState(false);
    const {user,setIsAuthenticated} = useContext(AuthContext);
    const logoutUser = ()=>{
        setIsAuthenticated(false)
        // console.log("logged out" )
        Cookies.remove(`userId${user.name}`)
        Cookies.remove(`token${user.name}`)
        // remove from backend socket
        setTimeout(() => {
            toast.success("You have successfully logged out!"); // show toast
        }, 1000); // delay of 1 second
    }
  const profileSetting = () => {
    Setsetting(!setting);
    // console.log("setting");
  };


  return (
    <>
      <div className="menu-ext">
        <div className="menu-int">
          <div className="prof" id="prof-set" onClick={profileSetting}>
            <img src={prf} alt="" width={20} height={20} />
            <h4>profile</h4>
          </div>
          <div className="prof" id="logout" onClick={logoutUser}>
            <h4>Logout</h4>
            <img src={log} alt="" width={20} height={20} />
          </div>
        </div>
      </div>
      {setting && <ProfileSetting  handle= {profileSetting}/>}
    </>
  );
}
