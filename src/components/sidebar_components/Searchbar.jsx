import React, { useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { chatDB } from "../../firebase-config";

const Searchbar = () => {

  // get searched user
  const [userSearched, setUserSearched] = useState("");

  // get found user 
  const [userFound, setUserFound] = useState(null);

  // error if no user found
  const [searchErr, setSearchErr] = useState({
    message: "",
    state: false
  });

  // after click on enter, search the username that was typed using Firebase query
  const handleSearch = async () => {
    // create a query against the collection
    const userQuery = query(collection(chatDB, "users"), where("displayName", "==", userSearched));

    // execute the query
    try{
      const querySnapshot = await getDocs(userQuery);
      if(querySnapshot.empty === true){
        // if no user is found
        setSearchErr({ ...searchErr, state: true, message: "No user found"});
        // unset previous user found
        setUserFound(null);
      }else{
        querySnapshot.forEach((doc) => {
          setSearchErr({ ...searchErr, state: false, message: ""}); 
          // doc.data() is never undefined for query doc snapshots       
          setUserFound(doc.data());
        });
      };
      
    }catch(error){
      // IN WHICH CASE IS AN ERROR CAUGHT ??? this doesn't display error if user not found
      // console.log(error);
    };
  };

  // get username that was typed
  // TODO: make sure that key event is well handled on touch devices
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className='searchbar'>
      <div className="searchForm">
        <input type="text" placeholder="Find a user" onKeyDown={handleKey} onChange={e => setUserSearched(e.target.value)}/>
      </div>
      {searchErr.state === true && <span className='errorMessage searchError'>{searchErr.message}</span> }
      {userFound && <div className="userChat">
        <img src={userFound.photoURL} alt="user avatar" />
        <div className="userChatInfo">
          <span>{userFound.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default Searchbar;