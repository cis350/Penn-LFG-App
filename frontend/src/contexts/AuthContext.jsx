import React, { useState } from 'react';
import {
  Navigate, Routes, Route, useNavigate,
} from 'react-router-dom';
import { loginUser, registerUser, logoutUser } from '../services/AuthApi';
import Header from '../components/Header';
import WelcomePage from '../pages/Welcome/WelcomePage';
import LoginPage from '../pages/Login/LoginPage';
import RegistrationPage from '../pages/Register/RegistrationPage';
import FeedPage from '../pages/Feed/FeedPage';
import AccountPage from '../pages/Account/AccountPage';
import CreatePostPage from '../pages/CreatePost/CreatePostPage';
import EditPostPage from '../pages/EditPost/EditPostPage';
import AboutPage from '../pages/About/AboutPage';
import ContactPage from '../pages/Contact/ContactPage';
import LandingPage from '../pages/Landing/LandingPage';

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

function AuthContext() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('app-token') !== null); // changed from sessionStorage to localStorage
  const navigate = useNavigate();
  let username;
  let password;
  let fname;
  let lname;

  // login button click event handler.
  /**
   * State is usually mutated inside event handler
   * @param {Event} e the click event dispatched by the login button
   */
  const handleLogin = async () => {
    // authenticate the user, the token is returned if success
    const token = await loginUser(username, password);

    if (!token) {
      alert('500: Internal Sever Error');
    } else if (typeof token === 'string') {
      // store the token
      localStorage.setItem('app-token', token);
      localStorage.setItem('username', username);
      // update the login state
      setIsLoggedIn(true);
      console.log('login', token);
    } else {
      alert(`error ${token.status}: ${token.message}`);
    }
  };

  const handleRegister = async () => {
    // authenticate the user, the token is returned if success
    const token = await registerUser(username, password, fname, lname);

    if (!token) {
      alert('500: Internal Sever Error');
    } else if (typeof token === 'string') {
      // store the token
      localStorage.setItem('app-token', token);
      localStorage.setItem('username', username);
      // update the login state
      setIsLoggedIn(true);
      console.log('register', token);
    } else {
      alert(`error ${token.status}: ${token.message}`);
    }
  };

  const handleLogout = async () => {
    const response = await logoutUser(username, password);

    if (!response) {
      alert('500: Internal Sever Error');
    } else if (response.status === 200 || response.status === 403 || response.status === 401) {
      localStorage.removeItem('app-token');
      localStorage.removeItem('username', username);
      setIsLoggedIn(false);
      navigate('/');
      // restart the app
      window.location.reload();
    } else {
      alert(`error ${response.status}: ${response.message}`);
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
        <Header isLoggedIn={false} />
        <Routes>
          <Route path="/" element={<LandingPage isLoggedIn={false}/>} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route
            path="/login"
            element={(
              <LoginPage
                onLogin={handleLogin}
                username={username}
                onUsernameChange={handleUsernameChange}
                password={password}
                onPasswordChange={handlePasswordChange}
              />
            )}
          />
          <Route
            path="/register"
            element={(
              <RegistrationPage
                onRegister={handleRegister}
                username={username}
                onUsernameChange={handleUsernameChange}
                password={password}
                onPasswordChange={handlePasswordChange}
                fname={fname}
                onFnameChange={handleFnameChange}
                lname={lname}
                onLnameChange={handleLnameChange}
              />
            )}
          />
          <Route path="/home" element={<Navigate to="/welcome" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </>
    );
  }
  return (
    <>
      <Header isLoggedIn={true} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={true} />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="*" element={<Navigate to="/feed" />} />
        <Route path="/login" element={<Navigate to="/feed" />} />
        <Route path="/register" element={<Navigate to="/feed" />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/edit-post" element={<EditPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default AuthContext;
