import { createContext, useState } from "react";
import React from "react";

export const CurrentUserContext  = createContext();
export const CurrentUserProvider = ({children})=>{
    const [selectedUser , setSelectedUser] = useState({});
    const [selectedUserDetails , setSelectedUserDetails] = useState({});
    return(
        <CurrentUserContext.Provider value={{selectedUser, setSelectedUser , selectedUserDetails , setSelectedUserDetails}}>
        {children}
    </CurrentUserContext.Provider>
    );
};