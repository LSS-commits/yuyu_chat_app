import React from 'react';

const Searchbar = () => {
  return (
    <div className='searchbar'>
      <div className="searchForm">
        <input type="text" placeholder="Find a user"/>
      </div>
      <div className="userChat">
        <img src="https://images.pexels.com/photos/14616881/pexels-photo-14616881.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="user avatar" />
        <div className="userChatInfo">
          <span>Tessa</span>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;