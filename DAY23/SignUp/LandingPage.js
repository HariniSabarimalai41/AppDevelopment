import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import movie1Image from './images/movie3.jpg';

const LandingPage = () => {
  const nav = useNavigate();

  const handleClick = () => {
    nav('/register');
  };

  return (
    <div className="landing-page">
      <div className="content-container">
        <div className="quote-container">
          <p className="welcome-text">Welcome back!</p>
          <p className="quote-text">
            Discover endless movie recommendations just for you. No strings attached, just tailored suggestions. Dive in and enjoy the cinematic journey!
          </p>
        </div>
        <button className="finish-signup-button" onClick={handleClick}>Finish Sign Up</button>
      </div>
      <img className="background-image" src={movie1Image} alt="Movie 1" />
      <div className="black-container">
        
        
      </div>
    </div>
  );
};

export default LandingPage;
