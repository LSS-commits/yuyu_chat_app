import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { chatDB } from '../../firebase-config';

const Chats = () => {

  // fetch convos from db in real time with useEffect and firebase realtime snapshot
  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    // as the value of currentUser.uid in empty at the beginning, wrap the snapshot method in a function
    const getChats = () => {
        // listen to the collection in realtime
      const unsub = onSnapshot(doc(chatDB, "userChats", currentUser.uid), (document) => {
        setChats(document.data());
      });

      // clean up (stop listening)
      return () => {
        unsub();
      };
    };
    
    // if there's a currentUser.uid, call the getChats function
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // convert the chats obj into an array (1st element = uid of the chat (to pass as a key in the loop), second element = chat object (to use contact info in the loop))

  return (
    <div className='chats'>
      { Object.entries(chats)?.map((chat) => (
        <div className="userChat" key={chat[0]}>
          <img src={chat[1].contactInfo.photoURL} alt="user avatar"/>
          <div className="userChatInfo">
            <span>{chat[1].contactInfo.displayName}</span>
            <p>{chat[1].contactInfo.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;