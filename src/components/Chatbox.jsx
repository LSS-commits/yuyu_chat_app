import React, { useContext } from 'react';
import Camera from "../assets/camera.png";
import AddUser from "../assets/adduser.png";
import ThreeDots from "../assets/threedots.png";
import Messages from './chatbox_components/Messages';
import Input from './chatbox_components/Input';
import { ChatContext } from '../context/ChatContext';


const Chatbox = () => {
  // fetch data to update user info
  const { data } = useContext(ChatContext);

  return (
    <div className='chatbox'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
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