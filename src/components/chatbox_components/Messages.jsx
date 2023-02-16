import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { chatDB } from '../../firebase-config';
import Message from './Message';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  // fetch data to update user info
  const { data } = useContext(ChatContext);

  // fetch chats > combinedId and messages
  useEffect(() => {
    const unSub = onSnapshot(doc(chatDB, "chats", data.chatId), (document) => {
      document.exists() && setMessages(document.data().messages)
    });

    // clean up
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className='messages'>
      {messages.map(msg=>(
        <Message message={msg} key={msg.id}/>
      ))}
    </div>
  );
}

export default Messages;