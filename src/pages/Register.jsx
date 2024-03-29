import React from 'react';
import Logo from "../assets/logo.png";
import AddAvatar from "../assets/addavatar.png";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, chatDB, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { validateFileUpload, isValidFormat } from "../shared/Functions";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

  // navigation hook
  const navigate = useNavigate();

  // toggle password
  const [passwordCheck, setPasswordCheck] = useState({
    password: "",
    showPassword: false
  });
  const checkboxClick = () => {
    setPasswordCheck({ ...passwordCheck, showPassword: !passwordCheck.showPassword });
  };
  const togglePassword = (prop) => (event) => {
    setPasswordCheck({ ...passwordCheck, [prop]: event.target.value });
  };


  // check avatar format, display preview, display status msg
  const [imgPreview, setImgPreview] = useState(null);
  const [imgData, setImgData]= useState(null);
  const [fileMsg, setFileMsg] = useState({
    message: "",
    state: false
  });

  const checkFile = (e) => {
    const avatar = e.target.files[0];
    validateFileUpload(avatar);

    // image preview
    if (isValidFormat === true) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgPreview(reader.result);
      });
      reader.readAsDataURL(avatar);
      setFileMsg({ ...fileMsg, state: false, message: "Here's your avatar!" });

      // since format is valid, get file for db storage
      setImgData(avatar);
    } else {
      // clear Filelist to prevent upload of invalid file
      setImgPreview(null);
      // no file to send to db storage
      setImgData(null);
      setFileMsg({ ...fileMsg, state: true, message: "Avatar should be jpeg or png" });
    }
  };

  // handle registration
  // form error
  const [formErr, setFormErr] = useState({
    message: "",
    state: false
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    // TODO: check that username doesn't exist in db (check usernames collection)
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // get imgData (= valid avatar)
    const file = imgData ? imgData : false;

    // FORM VALIDATION
    // error msg if form is incomplete
    if (!displayName || !email || !password || !file) {
      setFormErr({ ...formErr, state: true, message: "Form is incomplete" });

      // remove form error and only show avatar error if only avatar is missing
      if (!file) {
        setFileMsg({ ...fileMsg, state: true, message: "Please add an avatar image" });
        setFormErr({ ...formErr, state: false, message: "" });
      };

    } else {

      try {
        // register user with email and pw
        const response = await createUserWithEmailAndPassword(auth, email, password);
        // create unique avatar file name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName.replace(/\s+/g, "")}-avatar-${date}`);

        // use firebase uploadBytesResumable to upload file + track errors
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // update created user with username and avatar
              await updateProfile(response.user, {
                displayName,
                photoURL: downloadURL
              });

              // create user in db (without password since we need to see the other users?)
              await setDoc(doc(chatDB, "users", response.user.uid), {
                uid: response.user.uid,
                displayName,
                email,
                photoURL: downloadURL
              });

              // create empty user's chats collection for new user
              await setDoc(doc(chatDB, "userChats", response.user.uid), {});

              // TODO: add username to the usernames collection
              
              // navigate to logged app
              navigate("/chatboard");
              
            } catch (error) {
              // Firestore error (check rules in FB console and refresh)
              setFormErr({ ...formErr, state: true, message: "Something went wrong on our side, please try again later"});
            }
          })
        });

      } catch (e) {
        // get firebase form error, remove useless characters
        const errMsg = e.code;
        let formattedMsg = errMsg.replace("auth/", '').replaceAll("-", ' ');
        setFormErr({ ...formErr, state: true, message: formattedMsg });
      }; // end user creation with file upload
    }; // END FORM VALIDATION

  }; // end handle registration

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <img className="logo" src={Logo} alt="yuyu app logo" />
        <span className="title">Create your account</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Username (visible)" />
          <input required type="email" placeholder="Email" />
          <input required type={passwordCheck.showPassword ? "text" : "password"} onChange={togglePassword("password")} value={passwordCheck.password} placeholder="Password (at least 6 characters)" />
          <div className='checkPassword' onClick={checkboxClick}>
            <input type="checkbox" id="passwordToggle" />
            <label htmlFor="passwordToggle">Show/Hide Password</label>
          </div>
          <input type="file" className='avatarInput' id="addAvatar" accept="image/png, image/jpeg" onChange={checkFile} />
          <label htmlFor="addAvatar">
            <img src={AddAvatar} alt="add avatar img" />
            <span>Add an avatar</span>
          </label>
          {/* avatar preview if format is valid*/}
          {imgPreview && <img src={imgPreview} alt="test avatar" className="avatarPreview" />}
          {/* error if format is invalid */}
          {fileMsg.state === true && <span className='errorMessage'>{fileMsg.message}</span>}
          <button>Sign up</button>
          {/* form error */}
          {formErr.state === true && <span className='errorMessage'>{formErr.message}</span>}
        </form>
        <p>Already have an account? <Link to="/login" className='links'>Sign in</Link></p>
      </div>
    </div>
  );
}

export default Register;