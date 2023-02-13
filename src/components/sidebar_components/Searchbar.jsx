import React, { useContext, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { chatDB } from "../../firebase-config";
import { AuthContext } from '../../context/AuthContext';

const Searchbar = () => {

  // current user
  const { currentUser } = useContext(AuthContext);

  // get searched user
  const [userSearched, setUserSearched] = useState("");

  // get found user 
  const [userFound, setUserFound] = useState(null);

  // error if no user found
  const [searchErr, setSearchErr] = useState({
    message: "",
    state: false
  });

  // after enter (key), search the username that was typed using Firebase query
  const handleSearch = async () => {
    // create a query against the collection
    const userQuery = query(collection(chatDB, "users"), where("displayName", "==", userSearched));

    // execute the query
    try{
      const querySnapshot = await getDocs(userQuery);
      if(querySnapshot.empty){
        // if no user is found
        setSearchErr({ ...searchErr, state: true, message: "No user found"});
        // unset previous user found
        setUserFound(null);
      }else{
        querySnapshot.forEach((document) => {
          setSearchErr({ ...searchErr, state: false, message: ""}); 
          // make sure that current user doesn't start chat with him/herself
          if (document.data().uid === currentUser.uid) {
            setUserFound(null);
            setSearchErr({...searchErr, state: true, message: `This is me, ${currentUser.displayName}!`})
          }else{
            // document.data() is never undefined for query document snapshots       
            setUserFound(document.data());
          };
        });
      };
      
    }catch(error){
      // IN WHICH CASE IS AN ERROR CAUGHT ??? this doesn't display error if user not found
      // console.log(error);
    };
  };

  // get username that is being searched on enter key press
  // TODO: make sure that key event is well handled on touch devices
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // when found user is selected, create a chat collection between the 2 users in db
  /* NB : db structure => 
  * chats collection = chats of all users
  * userChats collection = all chats between the current user and another user
  * note that the chats are stored using the users combinedIds
  */
  const handleSelect = async () => {
   
    // check whether this chat coll exists in db, if not create one 

    // for collection search or creation, use combined ids of the 2 users
    // NB: users are sorted by alphabetical order of the id in db
    const combinedIds = currentUser.uid > userFound.uid ? currentUser.uid + userFound.uid : userFound.uid + currentUser.uid;

    try {
      const response = await getDoc(doc(chatDB, "chats", combinedIds));

      if (!response.exists()) {
        // create an empty chat in chats collection
        await setDoc(doc(chatDB, "chats", combinedIds), {messages: []});

        // create user chats for each user (fill userChats collection)
        // current sender
        await updateDoc(doc(chatDB, "userChats", currentUser.uid), {
          [combinedIds + ".contactInfo"]:{
            uid: userFound.uid,
            displayName: userFound.displayName,
            photoURL: userFound.photoURL
          },
          [combinedIds+".date"]: serverTimestamp()
        });
        // current recipient
        await updateDoc(doc(chatDB, "userChats", userFound.uid), {
          [combinedIds + ".contactInfo"]:{
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedIds+".date"]: serverTimestamp()
        });
      };
      // TODO: what if the collections already exists ???

    } catch (error) {
      // TODO: if error, display to the user
      console.log(error);
    };

    // when current user selects the userFound to start the convo, empty search 
    setUserFound(null);
    setUserSearched("");

  };

  return (
    <div className='searchbar'>
      <div className="searchForm">
        <input 
          type="text" 
          placeholder="Find a user" 
          onKeyDown={handleKey} 
          onChange={e => setUserSearched(e.target.value)}
          value={userSearched}
        />
      </div>
      {searchErr.state === true && <span className='errorMessage searchError'>{searchErr.message}</span> }
      {userFound && <div className="userChat" onClick={handleSelect}>
        <img src={userFound.photoURL} alt="user avatar" />
        <div className="userChatInfo">
          <span>{userFound.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default Searchbar;