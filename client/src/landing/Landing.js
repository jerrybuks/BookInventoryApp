import React from 'react';
import { Link } from "react-router-dom";
import background from "./asset/background.svg"
import Button from '../common/button/Button'
import './Landing.css'
import NavBar from '../navBar/NavBar';

function Landing() {
  return (
    <div className="landing">
       <NavBar />
      <header className="landing-header">
        <div className="landing-logoContainer">
          <img src={background} className="landing-logo" alt="logo" />
        </div>
        <div className="landing-textBlock">
          <h2>
            Create a digital Inventory of all your books. Fast , safe and reliable.
          </h2>
          <div className="landing-btnGrp">
            <Link to="/register"><Button name="Register" color="#4285f4" /></Link>  
            <Link to="/login"><Button name="Login" color="#3acc6c" /> </Link> 
          </div>
        </div>
      </header>
    </div>
  );
}

export default Landing;
