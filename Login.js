import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { findUserByUsernameAndPassword } from './data'; 
import { addUser } from './data'; 
import './Login.css';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setLoginError('Enter Valid Username or Password');
      return;
    }

     const user = findUserByUsernameAndPassword(username, password);
    if (user) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleValidation = () => {
    try {
      addUser(username, password);
      setIsLoggedIn(true);
      setLoginError('');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div>
          <h1>Welcome</h1>
          <h4>Username: {username}</h4>
          <h4>Password: {password}</h4>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>LOGIN</h1>
          {loginError && <p className="error">{loginError}</p>}
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
          <button onClick={handleLogin}>LOGIN</button>
          <div>{handleValidation}</div> 
          <Link className="link1" to="/reg"><p>New User? Register Now</p></Link>
        </div>
      )}
    </div>
  );
};

export default Login;
