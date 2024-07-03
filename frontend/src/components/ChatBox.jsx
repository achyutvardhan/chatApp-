import React, { useContext } from "react";
import prf from "../assets/profile.svg";
import "../css/Chatbox.css";
import { CurrentUserContext } from "../CurrentUserContext";
import Cookies from "js-cookie";
import {AuthContext} from "../AuthContext"
export default function ChatBox({ data }) {
  const {
    setSelectedUser,
    selectedUser,
    setSelectedUserDetails,
  } = useContext(CurrentUserContext);
  // console.log(data)
  const {user} = useContext(AuthContext)
  const handleSelectedUser = async () => {
    setSelectedUserDetails([]);
    setSelectedUser(data);
    //local storage check for the perticular user

    const token = Cookies.get(`token${user.name}`);
    const userId = Cookies.get(`userId${user.name}`);
    const getChat = await fetch(
      `https://chatapp-nmqt.onrender.com/auth/getChat/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          receiverId: selectedUser.user_id,
        }),
      }
    );
    const chatData = await getChat.json();
    // console.log(chatData.message);
    setSelectedUserDetails(chatData.message);
  };
  return (
    <>
      <div
        className="int-mes"
        id={selectedUser.user_id == data.user_id ? "active" : ""}
        onClick={handleSelectedUser}
      >
        <img src={prf} alt="" width={50} height={50} />
        <div className="sec-mes">
          <p>{data.user_name}</p>
          <p>online</p>
        </div>
      </div>
    </>
  );
}
