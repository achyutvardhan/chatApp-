import React, { useEffect } from "react";
import Hamburgerstate from "./Hamburgerstate";
import "../css/ChatName.css";
import ChatBox from "./ChatBox";
import db from "../db.json"
import Cookies from "js-cookie"
import { useContext } from "react";
import { ContactContext } from "../ContactContext";
export default function ChatName() {
  const {users} = db;
  const {setContacts,contacts} = useContext(ContactContext);
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  // console.log(token)
  // console.log(userId)
  useEffect(()=>{
    const getContacts = async () => {
      
      const getContact = await fetch(`http://localhost:3000/auth/getallUser/${userId}`,{
        method : 'GET',
        headers : {
          'Authorization' : `${token}`,
        }
      });
      const data = await getContact.json();
      // console.log(data.message)
      setContacts(data.message);
    }
    getContacts();
  },[userId])
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
              contacts.map((data,key)=>{
               return <ChatBox data={data} key={key}/>
              })
            }
            
          </div>
        </div>
      </div>
    </>
  );
}
