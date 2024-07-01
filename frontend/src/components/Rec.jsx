import React from "react";
import "../css/Rec.css";
export default function Rec({ data }) {
  // console.log(data);
  let date = new Date(data.timestamp);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  return (
    <>
      <div className="recext">
        <div className="recint">
          {/* <div className="namerec">
            <strong>Achyut Vardhan</strong>
          </div> */}
          <div className="recmsg"> {data.data}</div>
          <div className="recdtl">
            <div className="rectme">{hours}:{minutes}</div>
            {/* <div className="msgphase">//</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
