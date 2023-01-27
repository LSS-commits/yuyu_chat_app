import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../assets/logo.png";

const Login = () => {
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


    const [loginErr, setLoginErr] = useState({
        message: "",
        state: false
    });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/chatboard");
        } catch (error) {
            setLoginErr({...loginErr, state: true, message: "User not found" });
        }
    };


    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <img className="logo" src={Logo} alt="yuyu app logo" />
                <span className="title">Welcome back !</span>
                <form onSubmit={handleLogin}>
                    <input required type="email" placeholder="Email" />
                    <input required type={values.showPassword ? "text" : "password"} onChange={togglePassword("password")} value={values.password} placeholder="Password" />
                    <div className='checkPassword' onClick={checkboxClick}>
                        <input type="checkbox" id="passwordToggle" />
                        <label htmlFor="passwordToggle">Show/Hide Password</label>
                    </div>
                    <button>Sign in</button>
                    {loginErr.state === true && <span className='errorMessage'>{loginErr.message}</span>}
                </form>
                <p>You don't have an account? <Link to="/register" className='links'>Register</Link></p>
            </div>
        </div>
    );
}

export default Login;