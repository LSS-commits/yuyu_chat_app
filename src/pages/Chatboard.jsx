import React from 'react';
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";


const Chatboard = () => {
  return (
    <div className='chatboard'>
      <div className="container">
        <Sidebar/>
        <Chatbox/>
      </div>
    </div>
  );
}

export default Chatboard;