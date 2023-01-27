import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [signOutMsg, setSignOutMsg] = useState({
    message: "",
    state: false
  });

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      // since no user is authenticated, navigate to public route (in App)
    }).catch((error) => {
      // error
      setSignOutMsg({ ...signOutMsg, state: true, message: "An error occurred, please retry later"});
    });
  };

  return (
    <div className='navbar'>
      <span className='logo'>Yuyu Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="user avatar"/>
        <span>{currentUser.displayName}</span>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
      {signOutMsg.state === true && <span className="errorMessage">{signOutMsg.message}</span>}
    </div>
  );
}

export default Navbar;