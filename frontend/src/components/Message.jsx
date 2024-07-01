import React, { useContext , useState } from "react";
import ChatHeader from "./ChatHeader";
import send from "../assets/send.svg";
import Sen from "./Sen.jsx";
import Rec from "./Rec.jsx";
import "../css/Message.css";
import Cookies from "js-cookie";
import { CurrentUserContext } from "../CurrentUserContext.jsx";
export default function Message() {
  const { selectedUser, selectedUserDetails } = useContext(CurrentUserContext);
  const [sentMessage, setSentMessage] = useState(undefined);
  const [arrivalMessage, setArrivalMessage] = useState(undefined);
  // console.log(selectedUserDetails[0]?.chats[0].message);
  console.log(selectedUserDetails)
  const userId = Cookies.get("userId");
  const handleSendButton = async(e)=>{
    console.log("clicked");
    e.preventDefault();
    console.log(selectedUser)

    const token = Cookies.get("token");
    const send = await fetch(`http://localhost:3000/auth/sendChat/${userId}`,
      {
        method : 'POST',
        headers : {
          'Authorization' : `${token}`,
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          receiver : selectedUser.user_id,
          data : sentMessage
        })
      }
    )
    const res = await send.json();    
    console.log(res);
    if(send.status!=201)
      alert("Something went wrong");
  }
  return (
    <>
      <div className="extmess">
        <div className="intmess">
          <ChatHeader />
          <div className="line-1"></div>
          <div className="message-area">
            <div className="messages">
              {selectedUserDetails?.map((data, key) => {
                // console.log(data);
                if (data.sender_id == userId) {
                  return <Sen data={data} key={key} />;
                } else {
                  return <Rec data={data} key={key} />;
                }
              })}
            </div>
            <div className="inp">
              <input type="text" name="" id="" placeholder="type here ..." onChange={(e) => setSentMessage(e.target.value)} />
              <button onClick={handleSendButton}>
                <img src={send} alt="" width={25}  />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
