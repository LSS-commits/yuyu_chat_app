import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";

const Login = () => {
    // toggle password
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false
    });

    // TODO: add error message
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

        } catch (error) {
            setLoginErr({...loginErr, state: true, message: "Invalid email and/or password" });
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
                </form>
                <p>You don't have an account? Register</p>
            </div>
        </div>
    );
}

export default Login;