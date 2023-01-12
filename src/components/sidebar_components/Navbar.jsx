import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
// import { useState } from 'react';

const Navbar = () => {
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
        <img src="https://images.pexels.com/photos/14616881/pexels-photo-14616881.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="user avatar"/>
        <span>Username</span>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
      {signOutMsg && <span className='errorMessage'>{signOutMsg.message}</span>}
    </div>
  );
}

export default Navbar;