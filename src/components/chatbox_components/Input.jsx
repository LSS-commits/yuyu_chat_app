import React, { useContext, useState } from 'react';
import AddImg from "../../assets/addimg.png";
// import Attach from "../../assets/attach.png";
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { isValidFormat, validateFileUpload } from '../../shared/Functions';

const Input = () => {
  // to send a text msg
  const [text, setText] = useState("");
  // to send an img
  const [image, setImage] = useState(null);
  // display invalid file msg
  const [imageErr, setImageErr] = useState({
    message: "",
    state: false
  });

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // TODO: validate file/img format
  const checkImg = (e) => {
    const imgFile = e.target.files[0];
    validateFileUpload(imgFile);

    if (isValidFormat === true) {
      setImage(imgFile);
    } else {
      setImage(null);
      setImageErr({ ...imageErr, state: true, message: "Image should be jpeg or png"});
    }
  };

  // TODO: also validate attached files (restrict certain types) or only enable image upload?

  const handleSend = () => {
    // check whether there's a file or not
    if(image) {
      
    }else{
      // only send text
    }
  };


  return (
    <div className='messageInput'>
      <input type="text" placeholder="Type your message..." onChange={e => setText(e.target.value)}/>
      { imageErr.state === true && <span className='errorMessage'>{imageErr.message}</span>}
      <div className="sendMessage">
        {/* <input type="file" className="messageFile" id="attachFile"/>
        <label htmlFor="attachFile">
          <img src={Attach} alt="attach file icon"/>
        </label> */}
        <input type="file" className="messageFile" id="imgFile" accept="image/png, image/jpeg" onChange={checkImg}/>
        <label htmlFor="imgFile">
          <img src={AddImg} alt="add img icon"/>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;