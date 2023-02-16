import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";

// to share user data to the tree of components
export const AuthContext = createContext();

// create authentication provider
export const AuthContextProvider = ({children}) => {
    // current user
    const [currentUser, setCurrentUser] = useState({});

    // check if a user is authentified with Firebase Auth
    useEffect(() => {
        let isAuthSubscribed = true;
        onAuthStateChanged(auth, (user) => {
            if (isAuthSubscribed) { 
                // if auth sends a user, set currentUser
                setCurrentUser(user);
                // console.log(user);
                // console.log(isAuthSubscribed);
            }
        });

        // when using useEffect, use cleanup function to prevent memory leaks (only update state when components are mounted) = cancel all subscrips and fetch requests
        return () => {
            // cancel the subscription
            isAuthSubscribed = false;
            // console.log(isAuthSubscribed);
        };
    }, []);

    return(
        // pass data to the components
        <AuthContext.Provider value={{currentUser}}>
            {/* all app components can reach currentuser */}
            {children}
        </AuthContext.Provider>
    );
};

// wrap app components in index.js