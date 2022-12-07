import React from 'react';
import Logo from "../assets/logo.png";
import AddAvatar from "../assets/addavatar.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";


const Register = () => {
  // toggle password
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });

  const checkboxClick = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const togglePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // handle registration
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // e.target[3] = password checkbox

    // get the first uploaded file
    const file = e.target[4].files[0];



    // firebase function to register user with email and pw
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // firebase validates the email and password
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <img className="logo" src={Logo} alt="yuyu app logo" />
        <span className="title">Create your account</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Username (visible)" />
          <input required type="email" placeholder="Email" />
          <input required type={values.showPassword ? "text" : "password"} onChange={togglePassword("password")} value={values.password} placeholder="Password" />
          <div className='checkPassword' onClick={checkboxClick}>
            <input type="checkbox" id="passwordToggle" />
            <label htmlFor="passwordToggle">Show/Hide Password</label>
          </div>
          <input required type="file" className='avatarInput' id="addAvatar" />
          <label htmlFor="addAvatar">
            <img src={AddAvatar} alt="add avatar img" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
}

export default Register;