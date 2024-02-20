import React from "react";
import prf from "../assets/profile.svg";
import "../css/ChatHeader.css";
import { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
export default function ChatHeader() {
  const { selectedUser } = useContext(CurrentUserContext);
  return (
    <>
      <div className="exthead">
        <div className="inhead">
          <img src={prf} alt="" width={50} height={50} />
          <p>{selectedUser.name}</p>
        </div>
      </div>
    </>
  );
}
