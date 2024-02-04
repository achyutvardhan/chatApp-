import React from 'react'
import prf from '../assets/profile.svg'
import '../css/ChatHeader.css'
export default function ChatHeader() {
  return (
    <>
    <div className="exthead">
        <div className="inhead">
            <img src={prf} alt="" width={50} height={50} />
            <p>Name</p>
        </div>
    </div>
    </>
  )
}
