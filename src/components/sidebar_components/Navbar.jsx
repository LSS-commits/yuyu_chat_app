import React from 'react';
import Picto from "../../assets/picto.png";

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={Picto} alt="yuyu app picto"/>
      <div className="user">
        <img src="https://images.pexels.com/photos/14616881/pexels-photo-14616881.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="user avatar"/>
        <span>Username</span>
        <button>Sign out &#128564;</button>
      </div>
    </div>
  );
}

export default Navbar;