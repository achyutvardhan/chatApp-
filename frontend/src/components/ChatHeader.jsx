import React from "react";
import prf from "../assets/profile.svg";
import "../css/ChatHeader.css";
// import { useContext } from "react";
// import { AuthContext } from "../AuthContext";
export default function ChatHeader() {
  // const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    <>
      <div className="exthead">
        <div className="inhead">
          <img src={prf} alt="" width={50} height={50} />
          <p>Name</p>
        </div>
      </div>
    </>
  );
}
