import React from 'react';

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Yuyu Chat</span>
      <div className="user">
        <img src="https://images.pexels.com/photos/14616881/pexels-photo-14616881.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="user avatar"/>
        <span>Username</span>
        <button>Sign out</button>
      </div>
    </div>
  );
}

export default Navbar;