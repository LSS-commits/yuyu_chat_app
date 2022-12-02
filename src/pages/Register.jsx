import React from 'react';
import Logo from "../assets/logo.png";
import AddAvatar from "../assets/addAvatar.png";

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

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <img className="logo" src={Logo} alt="yuyu app logo" />
        <span className="title">Create your account</span>
        <form>
          <input type="text" placeholder="Username (visible)" />
          <input type="email" placeholder="Email" />
          <input type={values.showPassword ? "text" : "password"} onChange={togglePassword("password")} value={values.password} placeholder="Password" />
          <div className='checkPassword' onClick={checkboxClick}>
            <input type="checkbox" id="passwordToggle" />
            <label htmlFor="passwordToggle">Show/Hide Password</label>
          </div>
          <input className='avatarInput' type="file" id="addAvatar" />
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