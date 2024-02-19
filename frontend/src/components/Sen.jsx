import React from "react";
import "../css/Sen.css";
export default function Sen({ data }) {
  // console.log(data);

  let date = new Date(data.timestamp);

let hours = date.getHours();
let minutes = date.getMinutes();
  return (
    <>
      <div className="sndext">
        <div className="sndint">
          <div className="sndmsg">{data.message}</div>
          <div className="snddtl">
            <div className="sndtme">{hours }:{ minutes}</div>
            <div className="msgphas">//</div>
          </div>
        </div>
      </div>
    </>
  );
}
