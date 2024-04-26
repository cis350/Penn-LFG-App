
import React, { useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { loginUser, registerUser, logoutUser, verifyUser } from '../frontendAPI/frontendAuth';
import Header from './Header';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import HomePage from './HomePage';

/**
 * The login/logout component is stateful
 * The login state is the variable `isLoggedIn`
 * Session: the JWT is stored in localstorage
 * If there is a token in local storage then we assume
 * that the user is loggged in.
 * Otherwise we assume that they are not.
 * When login out, the JWT is deleted from localstorage
 * 
 * It shows you the difference between a local variable
 * `username` that is reinitialized with each rendering
 * and usernameRef that persists between renderings
 * 
 * The state is initialized 
 * @returns This stateful component 
 */

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('app-token') !== null); // changed from sessionStorage to localStorage
  let username; 
  let password;
  let fname;
  let lname;

  // login button click event handler.
  /**
   * State is usually mutated inside event handler
   * @param {Event} e the click event dispatched by the login button
   */
  const handleLogin = async (e) => {
    // authenticate the user, the token is returned if success
    const token = await loginUser(username, password);

    if (!token) {
      alert('500: Internal Sever Error');
    } else if (typeof token === "string") {
      // store the token
      localStorage.setItem('app-token', token);
      // update the login state
      setIsLoggedIn(true);
      console.log('login', token);
      console.log("isLoggedIn", isLoggedIn);
    } else {
      alert(`error ${token.status}: ${token.message}`);
    }
  };

  const handleRegister = async (e) => {
    // authenticate the user, the token is returned if success
    const token = await registerUser(username, password, fname, lname);

    if (!token) {
      alert('500: Internal Sever Error');
    } else if (typeof token === "string") {
      // store the token
      localStorage.setItem('app-token', token);
      // update the login state
      setIsLoggedIn(true);
      console.log('register', token);
    } else {
      alert(`error ${token.status}: ${token.message}`);
    }
  };

  const handleLogout = async (e) => {
    const status = await logoutUser(username, password);

    if (!status) {
      alert('500: Internal Sever Error');
    } else if (typeof status === "number") {
      if(status === 200) {
        // detele the JWT once the backend response is 200
        localStorage.removeItem('app-token');
        // restart the app
        window.location.reload();
      }
    } else {
      alert(`error ${status.status}: ${status.message}`);
    }
  };

  // input change event handler
  const handleUsernameChange = (e) => {
    username = e.target.value; // update local variable
  };

    // input change event handler
  const handlePasswordChange = (e) => {
    password = e.target.value; // update the reference
  };

  // input change event handler
  const handleFnameChange = (e) => {
    fname = e.target.value; // update the reference
  };

  // input change event handler
  const handleLnameChange = (e) => {
    lname = e.target.value; // update the reference
  };
  
  // conditional rendering based on the state
  if (isLoggedIn === false) {
    return (
      <>
        <Header isLoggedIn={false} /><Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage 
              onLogin={handleLogin}
              username={username}
              onUsernameChange={handleUsernameChange}
              password={password}
              onPasswordChange={handlePasswordChange}
              />} />
            <Route path="/register" element={<RegistrationPage
              onRegister={handleRegister} 
              username={username}
              onUsernameChange={handleUsernameChange}
              password={password}
              onPasswordChange={handlePasswordChange}
              fname={fname}
              onFnameChange={handleFnameChange}
              lname={lname}
              onLnameChange={handleLnameChange}
              />} />
            <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
          <Header isLoggedIn={true} onLogout={handleLogout}/>
          <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/home" />} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/login" element={<Navigate to="/home" />} />
              <Route path="/register" element={<Navigate to="/home" />} />
          </Routes>
      </>
    );
  }
}

export default Login;
