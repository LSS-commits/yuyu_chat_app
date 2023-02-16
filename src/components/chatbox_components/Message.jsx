import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Message = ({message}) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log(message);
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/14616881/pexels-photo-14616881.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="user avatar"/>
        {/* TODO: Add real timestamp */}
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>안녕!</p>
        <img src="https://images.pexels.com/photos/14616881/pexels-photo-14616881.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="user avatar"/>
      </div>
    </div>
  );
}

export default Message;