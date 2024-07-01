import { createContext ,useState} from 'react'
import React from "react";
export const ContactContext = createContext();

export const ContactProvider = ({children}) =>{

    const [contacts , setContacts] = useState([]);

    return(
        <ContactContext.Provider value={{contacts , setContacts}}>
            {children}  
            </ContactContext.Provider>
    );
};