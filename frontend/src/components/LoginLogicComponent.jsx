
import React, { useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { loginUser, registerUser } from '../frontendAPI/frontendAuth';
import Header from './Header';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import HomePage from './HomePage';

/**
 * The login/logout component is stateful
 * The login state is the variable `loginToken`
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
    // add a state to the component
    // update the login state to check for the presence 
    // of the JWT
    const [loginToken, setLoginToken] = useState(sessionStorage.getItem('app-token') !== null);
    let username; // will store the username. this value is destroyed after each rendering
    let password; // will store the password
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
      if(token){  // check that the token is not undefined
        // store the token
        localStorage.setItem('app-token', token);
        // update the login state
        setLoginToken(true);
        console.log('login', token);
      } else {
        console.log('Error', 'authentication failure');
        alert('500: Internal Sever Error');
      }
    };

    const handleRegister = async (e) => {
        // authenticate the user, the token is returned if success
        const token = await registerUser(username, password, fname, lname);
        if(token){  // check that the token is not undefined
          // store the token
          localStorage.setItem('app-token', token);
          // update the login state
          setLoginToken(true);
          console.log('login', token);
        } else {
          console.log('Error', 'registration or authentication failure');
          alert('500: Internal Sever Error');
        }
      };

    // input change event handler
    const handleUsernameChange = (e) => {
      username = e.target.value; // update local variable
      console.log('value', username);
    };
  
     // input change event handler
    const handlePasswordChange = (e) => {
      password = e.target.value; // update the reference
      console.log('value', password);
    };

    // input change event handler
    const handleFnameChange = (e) => {
      fname = e.target.value; // update the reference
      console.log('value', fname);
    };

    // input change event handler
    const handleLnameChange = (e) => {
      lname = e.target.value; // update the reference
      console.log('value', lname);
    };
    
    // conditional rendering based on the state
    if (loginToken === false) {
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
            <Header isLoggedIn={true} />
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