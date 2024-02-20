import React, { useContext } from "react";
import "../css/ProfileSetting.css";
import prf from "../assets/profile.svg";
import { AuthContext } from "../AuthContext";
export default function ProfileSetting() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <div className="set-ext">
        <div className="set-in">
          <div className="profile-pic">
            <img src={prf} alt="profile pic" width={160} height={160} />
            <strong>{user.name.testuser}</strong>
            <input type="file" name="" id="" />
          </div>
          <div className="form-div">
            <form action="" className="form1">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="full-name"
                id="full-name"
                placeholder={user.name.testuser}
              />
              <button type="submit">Update</button>
            </form>
            <form action="" className="form1">
              <label htmlFor="">Password</label>
              <input type="password" name="" id="" />
              <button type="submit">Update</button>
            </form>
          </div>
          <form action="" className="form2">
            <label htmlFor="">Email</label>
            <input type="email" name="" id="" placeholder={user.email.testEmail} />
            <button type="submit">update</button>
          </form>
        </div>
      </div>
    </>
  );
}
