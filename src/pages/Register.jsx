import React from 'react';
import Logo from "../assets/logo.png";
import AddAvatar from "../assets/addavatar.png";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { validateFileUpload, isValidFormat } from "../shared/Functions";

const Register = () => {
  // toggle password
  const [values, setValues] = useState({
    password: "",
    showPassword: false
  });
  const checkboxClick = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const togglePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  // check avatar and display preview
  const [imgData, setImgData] = useState(null);
  // file msg
  const [fileMsg, setfileMsg] = useState({
    message: "",
    state: false
  });
  const checkFile = (e) => {
    const avatar = e.target.files[0];
    validateFileUpload(avatar);
    // console.log(isValidFormat);
    if (isValidFormat === true) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(avatar);
      setfileMsg({ ...fileMsg, state: false, message: "Here's your avatar!" });
    }else{
      // clear Filelist to prevent upload of invalid file
      setImgData(null);
      setfileMsg({ ...fileMsg, state: true, message: "Avatar should be jpeg or png"});
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

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // NB e.target[3] = password checkbox
    // get imgData 
    const file = imgData ? imgData : false;
    
    
    console.log(file.type, file.name);

    // const user = userCredential.user;

    // error msg if form is incomplete
    if (!displayName || !email || !password || !file) {
      setFormErr({ ...formErr, state: true, message: "Form is incomplete" });
      if (!file) {
        setfileMsg({ ...fileMsg, state: true, message: "Please add an avatar image"});
        // remove form error if only avatar is missing
        setFormErr({ ...formErr, state: false, message: "" });
      };
    } else {

      try {
        // firebase function to register user with email and pw
        const response = await createUserWithEmailAndPassword(auth, email, password);

        const fileRef = displayName + "-avatar";
        const storageRef = ref(storage, fileRef);

        // use firebase uploadBytesResumable to upload file + track errors
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          (error) => {
            setfileMsg({ ...fileMsg, state: true, message: "Error while uploading the file:" + error });
            // console.log("Error while uploading the file:" + error);
          },
          () => {
            // success
            // ex: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
              console.log('File available at', downloadURL);
              // update created user with username and avatar
              await updateProfile(response.user, {
                displayName,
                photoURL: downloadURL,
                
              });
            });
          }
        );

      } catch (e) {
        // get firebase form error, remove useless characters, style with css
        const errMsg = e.code;
        let formattedMsg = errMsg.replace("auth/", '').replaceAll("-", ' ');
        setFormErr({ ...formErr, state: true, message: formattedMsg });
      }
    }

  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <img className="logo" src={Logo} alt="yuyu app logo" />
        <span className="title">Create your account</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Username (visible)" />
          <input required type="email" placeholder="Email" />
          <input required type={values.showPassword ? "text" : "password"} onChange={togglePassword("password")} value={values.password} placeholder="Password (at least 6 characters)" />
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
          {imgData && <img src={imgData} alt="test avatar" className="avatarPreview" />}
          {/* error if format is invalid */}
          {fileMsg && <span className='errorMessage'>{fileMsg.message}</span>}
          <button>Sign up</button>
          {/* form error */}
          {formErr && <span className='errorMessage'>{formErr.message}</span>}
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
}

export default Register;