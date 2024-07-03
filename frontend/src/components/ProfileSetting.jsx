import React, { useContext,useState } from "react";
import "../css/ProfileSetting.css";
import prf from "../assets/profile.svg";
import cross from "../assets/crosscircle.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { AuthContext } from "../AuthContext";
export default function ProfileSetting({handle}) {
  const { user } = useContext(AuthContext);
  const [data ,setData] = useState({});
  
  
  const handleClick = (e)=>{
    handle();
  }

  const SubmitRespo = async(e)=>{
      e.preventDefault();
      const token = Cookies.get(`token${user.name}`);
      const userId = Cookies.get(`userId${user.name}`);
      const sendProfileData = await fetch(`https://chatapp-nmqt.onrender.com/auth/updateProfile/${userId}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`${token}`
        },
        body:JSON.stringify(data)
      })
      const res = await sendProfileData.json();
      if(sendProfileData.status === 200){
        // console.log("profile updated")
        toast.success(res.message);
      }else{
        toast.error(res.message);
      }
  }
  return (
    <>
    <ToastContainer/>
      <div className="set-ext">
        <div className="set-in">
          <img src={cross} alt="cross" width={20} hright={20} className="crossbut" onClick={handleClick} />
          <div className="profile-pic">
            <img src={prf} alt="profile pic" width={160} height={160} />
            <strong>{user.name}</strong>
            <input type="file" name="" id="" />
          </div>
          <div className="form-div">
            <form action="" className="form1" onSubmit={SubmitRespo}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="full-name"
                id="full-name"
                placeholder={user.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              {/* <button type="submit">Update</button> */}
              <label htmlFor="">Email</label>
              <input
                type="email"
                name=""
                id=""
                placeholder={user.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <label htmlFor="">Current Password</label>
              <input type="password" name="" id="" placeholder="current password" onChange={(e) => setData({ ...data, prevPassword: e.target.value })}/>
              <label htmlFor="">New Password</label>
              <input type="password" name="" id=""  placeholder="new password" onChange={(e) => setData({ ...data, newPassword: e.target.value })}/>
              {/* <button type="submit">Update</button> */}
              <button type="submit">update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
