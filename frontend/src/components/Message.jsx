import React from "react";
import ChatHeader from "./ChatHeader";
import send from "../assets/send.svg";
import Sen from "./Sen.jsx";
import Rec from "./Rec.jsx";
import "../css/Message.css";
export default function Message() {
  
  return (
    <>
      <div className="extmess">
        <div className="intmess">
          <ChatHeader />
          <div className="line-1"></div>
          <div className="message-area">
            <div className="messages">
              <Sen/>
              <Rec/>
            </div>
            <div className="inp">
              <input type="text" name="" id="" placeholder="type here ..." />
              <button>
                <img src={send} alt="" width={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
