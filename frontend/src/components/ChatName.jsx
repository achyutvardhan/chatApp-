import React from "react";
import Hamburgerstate from "./Hamburgerstate";
import "../css/ChatName.css";
import ChatBox from "./ChatBox";
import db from "../db.json"
export default function ChatName() {
  const {users} = db;
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
            {
              users.map((data,key)=>{
                // if()
               return <ChatBox data={data} key={key}/>
              })
            }
            
          </div>
        </div>
      </div>
    </>
  );
}
