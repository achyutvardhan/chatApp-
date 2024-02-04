import React from "react";
import Hamburgerstate from "./Hamburgerstate";
import "../css/ChatName.css";
import ChatBox from "./ChatBox";
export default function ChatName() {
  return (
    <>
      <div className="ext-name">
        <div className="in-name">
          <div className="profile-details">
            <Hamburgerstate />
            <input type="search" name="" id="" placeholder="search here" />
          </div>
          <div className="line"></div>
          <div className="Message-details">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
}
