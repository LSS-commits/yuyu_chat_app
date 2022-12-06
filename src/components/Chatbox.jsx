import React from 'react';
import Camera from "../assets/camera.png";
import AddUser from "../assets/adduser.png";
import ThreeDots from "../assets/threedots.png";
import Messages from './chatbox_components/Messages';
import Input from './chatbox_components/Input';


const Chatbox = () => {
  return (
    <div className='chatbox'>
      <div className="chatInfo">
        <span>Tessa</span>
        <div className="chatIcons">
          <img src={Camera} alt="camera icon"/>
          <img src={AddUser} alt="add user icon"/>
          <img src={ThreeDots} alt="three dots icon"/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  );
}

export default Chatbox;