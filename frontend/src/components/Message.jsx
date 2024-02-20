import React, { useContext } from "react";
import ChatHeader from "./ChatHeader";
import send from "../assets/send.svg";
import Sen from "./Sen.jsx";
import Rec from "./Rec.jsx";
import "../css/Message.css";
import { CurrentUserContext } from "../CurrentUserContext.jsx";
export default function Message() {
  const { selectedUser, selectedUserDetails } = useContext(CurrentUserContext);
  // console.log(selectedUserDetails[0]?.chats[0].message);
  return (
    <>
      <div className="extmess">
        <div className="intmess">
          <ChatHeader />
          <div className="line-1"></div>
          <div className="message-area">
            <div className="messages">
              {selectedUserDetails[0]?.chats.map((data, key) => {
                // console.log(data);
                if (data.user_id == 1) {
                  return <Sen data={data} key={key} />;
                } else {
                  return <Rec data={data} key={key} />;
                }
              })}
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
