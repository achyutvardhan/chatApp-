import React from 'react'
import prf from '../assets/profile.svg'
import "../css/Chatbox.css"
export default function ChatBox() {
  return (
   <>
    <div className="int-mes">
        <img src={prf} alt="" srcset="" width={50} height={50} />
        <div className="sec-mes">
          <p>Achyut Vardhan</p>
          <p>Recent Message</p>
        </div>
      </div>

   </>
  )
}
