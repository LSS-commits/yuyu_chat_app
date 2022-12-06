import React from 'react';
import AddImg from "../../assets/addimg.png";
import Attach from "../../assets/attach.png";

const Input = () => {
  return (
    <div className='messageInput'>
      <input type="text" placeholder="Type your message..."/>
      <div className="sendMessage">
        <input type="file" className="messageFile" id="attachFile"/>
        <label htmlFor="attachFile">
          <img src={Attach} alt="attach file icon"/>
        </label>
        <input type="file" className="messageFile" id="imgFile"/>
        <label htmlFor="imgFile">
          <img src={AddImg} alt="add img icon"/>
        </label>
        <button>Send</button>
      </div>
    </div>
  );
}

export default Input;