import React from 'react';
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";


const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chatbox/>
      </div>
    </div>
  );
}

export default Home;