import React from 'react';
import Logo from "../assets/logo.png";
import AddAvatar from "../assets/addavatar.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../firebase-config";
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { validateFileUpload } from "../shared/Functions";

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


  // TODO: handle file format + display file name
  // checkFileType(file);
  // if (isTypeOk === false) {
  //   setFileErr({ ...fileErr, state: true, message: "Avatar should be jpeg or png" });
  // }else{
  //   setFileErr({ ...fileErr, state: false, message: "upload ok" });
  // }
  let testFile = false;
  const checkFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    validateFileUpload(file, testFile);

    return testFile;
  };


  // delete btn to clear field

  // handle registration
  // form error
  const [formErr, setFormErr] = useState({
    message: "",
    state: false
  });

  // file error
  const [fileErr, setFileErr] = useState({
    message: "",
    state: false
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // NB e.target[3] = password checkbox
    // get the first uploaded file
    const file = e.target[4].files[0];
    // NB MIME type restricted to image/png, image/jpeg in html

    console.log(file.type, file.name);
    // const user = userCredential.user;

    // error msg if form is incomplete
    if (!displayName || !email || !password || !file) {
      setFormErr({ ...formErr, state: !formErr.state, message: "Form is incomplete" });
    } else {

      // TODO: test check file type WHEN ???
      // checkFileType(file);
      // if (isTypeOk === false) {
      //   setFileErr({ ...fileErr, state: true, message: "Avatar should be jpeg or png" });
      // }else{
      //   setFileErr({ ...fileErr, state: false, message: "upload ok" });
      // }

      try {
        // firebase function to register user with email and pw
        const response = await createUserWithEmailAndPassword(auth, email, password);



        const fileRef = displayName + "-avatar";
        const storageRef = ref(storage, fileRef);


        // use firebase uploadBytesResumable to track errors
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          (error) => {
            // Handle unsuccessful uploads
            setFileErr({ ...fileErr, state: true, message: "Error while uploading the file:" + error });
            console.log("Error while uploading the file:" + error);
          },
          () => {
            // Handle successful uploads on complete

            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
            });

          }
        );

      } catch (e) {
        // get firebase error, remove useless characters, style with css
        const errMsg = e.code;
        let formattedMsg = errMsg.replace("auth/", '').replaceAll("-", ' ');
        setFormErr({ ...formErr, state: !formErr.state, message: formattedMsg });
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
          <input type="file" className='avatarInput' id="addAvatar" onChange={checkFile} />
          {/* accept="image/png, image/jpeg" */}
          <label htmlFor="addAvatar">
            <img src={AddAvatar} alt="add avatar img" />
            <span>Add an avatar</span>
          </label>
          {/* TODO: show uploaded file + error msg */}
          {fileErr && <span className='errorMessage'>{fileErr.message}</span>}
          <button>Sign up</button>
          {formErr && <span className='errorMessage'>{formErr.message}</span>}
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
}

export default Register;