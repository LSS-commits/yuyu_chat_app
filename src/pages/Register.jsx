import React from 'react';
import Logo from "../assets/logo.png";
import AddAvatar from "../assets/addavatar.png";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, chatDB, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { validateFileUpload, isValidFormat } from "../shared/Functions";
import { doc, setDoc } from "firebase/firestore";

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

    if (isValidFormat === true) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(avatar);
      setfileMsg({ ...fileMsg, state: false, message: "Here's your avatar!" });
    } else {
      // clear Filelist to prevent upload of invalid file
      setImgData(null);
      setfileMsg({ ...fileMsg, state: true, message: "Avatar should be jpeg or png" });
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


    // const user = userCredential.user;

    // error msg if form is incomplete
    if (!displayName || !email || !password || !file) {
      setFormErr({ ...formErr, state: true, message: "Form is incomplete" });

      // remove form error and only show avatar error if only avatar is missing
      if (!file) {
        setfileMsg({ ...fileMsg, state: true, message: "Please add an avatar image" });
        setFormErr({ ...formErr, state: false, message: "" });
      };

    } else {

      try {
        // register user with email and pw
        const response = await createUserWithEmailAndPassword(auth, email, password);
        // create unique avatar name
            // TODO: TEST ERROR
        // const date = new Date().getTime();
        // const fileRef = displayName.replace(/\s+/g, "") + "-avatar" + date;
        const storageRef = ref(storage, `${displayName.replace(/\s+/g, "")}-avatar`);

        // use firebase uploadBytesResumable to upload file + track errors
        // const uploadTask = uploadBytesResumable(storageRef, file);

        // uploadTask.on(
        //   (error) => {
        //     setfileMsg({ ...fileMsg, state: true, message: "Error while uploading the file:" + error });
        //   },
        //   () => {
        //     // success
        //     // ex: https://firebasestorage.googleapis.com/...
        //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        //       console.log('File available at', downloadURL);
        //       // update created user with username and avatar
        //       await updateProfile(response.user, {
        //         displayName,
        //         photoURL: downloadURL
        //       });
        //       // don't store passwords since we need to see other users in the app ?
        //       await setDoc(doc(chatDB, "users", response.user.uid), {
        //         uid: response.user.uid,
        //         displayName,
        //         email,
        //         photoURL: downloadURL
        //       });
        //     });
        //   }
        // );

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

              // create empty user chats for new user
              await setDoc(doc(chatDB, "userChats", response.user.uid), {});

              // navigate to logged app
              // navigate("/");
            } catch (error) {
              console.log(error);
              setfileMsg({ ...fileMsg, state: true, message: "Error while uploading the file:" + error });
            }
          })
        });

      } catch (e) {
        // get firebase form error, remove useless characters, style with css
        const errMsg = e.code;
        let formattedMsg = errMsg.replace("auth/", '').replaceAll("-", ' ');
        setFormErr({ ...formErr, state: true, message: formattedMsg });
      } // end user creation with file upload

    } // end form validation (if)

  }; // end handleSubmit

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