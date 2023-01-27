import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png";
import {IoLogoLinkedin, IoLogoTwitter, IoLogoYoutube} from "react-icons/io5";


const Welcome = () => {
  return (
    <div className='welcome'>
      <div className="container">
        <div className="welcomeBlock">
          <img className="logo" src={Logo} alt="yuyu app logo" />
          <h1 className="title">Yuyu is the new chill.</h1>
          <h2>Messaging. Free. Secure. With everyone, anywhere.</h2>
          <p className='loginLink'>Start your conversations</p>
          <Link to="/login" className='welcomeBtn'>Sign in</Link>
          <p className='registerLink'>You don't have an account?</p>
          <Link to="/register" className='links'>Register</Link>
        </div>
      </div>
      {/* footer */}
      <footer className="welcomeFooter">
        <span className='description'>Yuyu is a cloud-based web messaging app with a focus on security and speed.</span>
        <ul className="social-icon">
          <li className="social-icon__item"><span className="social-icon__link">
            <IoLogoLinkedin></IoLogoLinkedin>
            </span></li>
          <li className="social-icon__item"><span className="social-icon__link">
            <IoLogoTwitter></IoLogoTwitter>
            </span></li>
          <li className="social-icon__item"><span className="social-icon__link">
            <IoLogoYoutube></IoLogoYoutube>
            </span></li>
        </ul>
        <ul className="menu">
          <li className="menu__item"><span className="menu__link">About</span></li>
          <li className="menu__item"><span className="menu__link">Community</span></li>
          <li className="menu__item"><span className="menu__link">Careers</span></li>
          <li className="menu__item"><span className="menu__link">Terms & Policies</span></li>
          <li className="menu__item"><span className="menu__link">Privacy</span></li>
        </ul>
        <p>&copy;2023 Yuyu Media SARL | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Welcome;