import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.photoURL);

  const [signOutMsg, setSignOutMsg] = useState({
    message: "",
    state: false
  });

  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      // since no user is authenticated, navigate to login (see App>Protected Route)
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
      {signOutMsg && <span className='errorMessage'>{signOutMsg.message}</span>}
    </div>
  );
}

export default Navbar;