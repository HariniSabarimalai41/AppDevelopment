import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { findUser } from './data'; 
import { addUser } from './data'; 
import { useDispatch } from 'react-redux';
import { setMovie } from '../actions/movieActions';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import validator from 'validator';

const Login = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const movie = username; 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {};

  const handleValidation = async (e) => {
    e.preventDefault();
  
    try {
      if (password.length === 0 || username.length === 0) {
        alert('Fill All The Required Data');
      } else if (!username || !validator.isEmail(username)) {
        alert('Enter Valid Email');
      } else if (!password) {
        alert('Enter Valid Password');
      } else {
        axios.post("http://localhost:8080/api/auth/login", {
          email: username,
          password: password,
          role: role  
        })
          .then((response) => {
            console.log(response.data);
  
            const userRole = response.data.role;
  
            if (userRole === 'ADMIN'|| userRole === 'CUSTOMER') {
              const token = response.data.token;
              localStorage.setItem('token', token);
              navigate('/explore');
            } else {
              alert('You do not have the required role to access this page.');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };
  

  return (
    <div className="login-container">
    <video autoPlay loop muted className="background-video">
      <source src="bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div>
      {isLoggedIn ? (
        <div className='wel'>
          <h1>Welcome Back {username},</h1>
          <h1>"Lights are dimmed, popcorn's ready! Let's find the perfect film for your mood today.</h1>
          <button onClick={handleNext}>Explore</button>
        </div>
      ) : (
        <div>
          {loginError && <p className="error">{loginError}</p>}
          <form onSubmit={(e)=> e.preventDefault() } className="login-form">

          <h1>LOGIN</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleValidation}>LOGIN</button>
          <div>{handleValidation}</div> 
          <p>New User? 
          <Link className="link1" to="/register"> Register Now</Link>
          </p>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default Login;

  
  // <h1>Welcome</h1>
  // <h4>Username: {username}</h4>
  // <Link className="link1" to="/movies"> 
  // <button onClick={handleLogout}>Explore</button>
  // </Link>