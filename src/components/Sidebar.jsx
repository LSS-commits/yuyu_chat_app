import React from 'react';
import Chats from './sidebar_components/Chats';
import Navbar from "./sidebar_components/Navbar";
import Searchbar from "./sidebar_components/Searchbar";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Searchbar/>
      <Chats/>
    </div>
  );
}

export default Sidebar;