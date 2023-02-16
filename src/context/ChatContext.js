import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

/* when we click on a user in the users list, 
*  update user info
*  and chatId (get the convo b/ the 2 users)
*  these are passed to all the children components
*/

export const ChatContext = createContext();

// create chat context provider
export const ChatContextProvider = ({children}) => {

    // import currentUser
    const { currentUser } = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    };

    // create a reducer (pure function that determines changes to an application's state)
    const chatReducer = (state, action) => {
        // use switch here to handle several actions, for ex, change or block a user
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid
                };
            default:
                return state;
        };
        
    };

    // get state and dispatch (function to dispatch actions and trigger state changes) 
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return(
        // pass data and dispatch function (chatReducer) to the tree of components
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};

