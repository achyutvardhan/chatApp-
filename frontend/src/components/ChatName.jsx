import React, { useEffect } from "react";
import Hamburgerstate from "./Hamburgerstate";
import "../css/ChatName.css";
import ChatBox from "./ChatBox";
import Cookies from "js-cookie"
import { useContext } from "react";
import { ContactContext } from "../ContactContext";
import { AuthContext } from "../AuthContext";
export default function ChatName() {
  const {setContacts,contacts} = useContext(ContactContext);
  const {user} = useContext(AuthContext);
  const token = Cookies.get(`token${user.name}`);
  const userId = Cookies.get(`userId${user.name}`);
  useEffect(()=>{
    const getContacts = async () => {
      
      const getContact = await fetch(`https://chatapp-nmqt.onrender.com/auth/getallUser/${userId}`,{
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
