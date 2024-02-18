import React, { useContext } from "react";
import prf from "../assets/profile.svg";
import "../css/Chatbox.css";
import { CurrentUserContext } from "../CurrentUserContext";
import db from "../db.json"
export default function ChatBox({ data }) {
  const {setSelectedUser,selectedUser,setSelectedUserDetails} = useContext(CurrentUserContext)
  const {conversations} = db

  const handleSelectedUser = ()=>{
    setSelectedUser(data);

    const arr = conversations.filter((da,key)=>{

      return (da.participants[1]==data.id?da.chats:"");
    })
    setSelectedUserDetails(arr);

  }
  return (
    <>
      <div className="int-mes" id={(selectedUser.id==data.id)?"active":""} onClick={handleSelectedUser} >
        <img src={prf} alt="" srcset="" width={50} height={50} />
        <div className="sec-mes">
          <p>{data.name}</p>
          <p>online</p>
        </div>
      </div>
    </>
  );
}
