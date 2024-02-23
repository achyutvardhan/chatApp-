import React, { useContext } from "react";
import "../css/ProfileSetting.css";
import prf from "../assets/profile.svg";
import cross from "../assets/crosscircle.svg";
import { AuthContext } from "../AuthContext";
export default function ProfileSetting({handle}) {
  const { user } = useContext(AuthContext);
  console.log(handle)
  
  const handleClick = ()=>{
    handle();
  }

  const SubmitRespo = (e)=>{
      e.preventDefault();
      console.log("submitted")
  }
  return (
    <>
      <div className="set-ext">
        <div className="set-in">
          <img src={cross} alt="cross" width={20} hright={20} className="crossbut" onClick={handleClick} />
          <div className="profile-pic">
            <img src={prf} alt="profile pic" width={160} height={160} />
            <strong>{user.name.testuser}</strong>
            <input type="file" name="" id="" />
          </div>
          <div className="form-div">
            <form action="" className="form1" onSubmit={SubmitRespo}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="full-name"
                id="full-name"
                placeholder={user.name.testuser}
              />
              {/* <button type="submit">Update</button> */}
              <label htmlFor="">Email</label>
              <input
                type="email"
                name=""
                id=""
                placeholder={user.email.testEmail}
              />
              <label htmlFor="">Password</label>
              <input type="password" name="" id="" />
              {/* <button type="submit">Update</button> */}
              <button type="submit">update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
