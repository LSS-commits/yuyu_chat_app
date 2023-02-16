import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";

export const ChatContext = createContext();

// create authentication provider
export const ChatContextProvider = ({children}) => {
   
    /* when we click on a user in the users list, 
    *  update user info
    *  and chatId (get the convo b/ the 2 users)
    *  these are passed to all the children components
    */

    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    };

    
    // create a reducer (pure function that determines changes to an application's state)
    const chatReducer = (state, action) => {
        // use switch here to handle several actions, for ex, block a user
        switch(action.type){
            case "CHANGE_USER":
                return{

                }
            default:
                return state;
        };
        
    };

    return(
        // pass data to the components
        <ChatContext.Provider value={{}}>
            {children}
        </ChatContext.Provider>
    );
};

