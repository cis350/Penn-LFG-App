import React from 'react';
import './css/LoginPage.css';
import CustomButton from './CustomButton'; // Assuming you've created this button component

function LoginPage({ onLogin, username, onUsernameChange, password, onPasswordChange }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(); // Call the passed-in login handler
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Log in</h1>
        <p>Enter your username and password to log into Penn LFG</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username}
            placeholder="username" 
            onChange={onUsernameChange} 
          />
          <input 
            type="password" 
            value={password}
            placeholder="password"
            onChange={onPasswordChange}
          />
          <CustomButton variant="large" type="submit">Login</CustomButton>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
