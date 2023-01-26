import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png";
import {IoLogoLinkedin, IoLogoTwitter, IoLogoYoutube} from "react-icons/io5";


const Welcome = () => {
  return (
    <div className='welcome'>
      <div className="container">
        {/* card > yuyu logo > title > links to login or register */}
        <img className="logo" src={Logo} alt="yuyu app logo" />
        <h1 className="title">Yuyu is the new chill.</h1>
        <h2>Messaging. Free. Safe. With everyone, everywhere.</h2>
        <p>Sign in to start your conversations <Link to="/login" className='links'>Login</Link></p>
        <p>You don't have an account? <Link to="/register" className='links'>Register</Link></p>
      </div>
        {/* footer */}
        <footer className='welcomeFooter'>
          <span>Yuyu is a cloud-based web messaging app with a focus on security and speed.</span>
        </footer>

        <footer class="footer">
    <div class="waves">
      <div class="wave" id="wave1"></div>
      <div class="wave" id="wave2"></div>
      <div class="wave" id="wave3"></div>
      <div class="wave" id="wave4"></div>
    </div>
    <ul class="social-icon">
      <li class="social-icon__item"><a class="social-icon__link" href="#">
        <IoLogoLinkedin></IoLogoLinkedin>
        </a></li>
      <li class="social-icon__item"><a class="social-icon__link" href="#">
        </a></li>
      <li class="social-icon__item"><a class="social-icon__link" href="#">
        </a></li>
    </ul>
    <ul class="menu">
      <li class="menu__item"><a class="menu__link" href="#">Home</a></li>
      <li class="menu__item"><a class="menu__link" href="#">About</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Services</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Team</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>

    </ul>
    <p>&copy;2021 Nadine Coelho | All Rights Reserved</p>
  </footer>
    </div>
  );
}

export default Welcome;