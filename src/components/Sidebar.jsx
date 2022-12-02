import React from 'react';
import Navbar from "./sidebar_components/Navbar";
import Searchbar from "./sidebar_components/Searchbar";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Searchbar/>
    </div>
  );
}

export default Sidebar;