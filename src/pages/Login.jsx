import React from 'react';
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
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <img className="logo" src={Logo} alt="yuyu app logo" />
                <span className="title">Welcome back !</span>
                <form>
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