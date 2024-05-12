import React from 'react';
import './LoginPage.css';
import CustomButton from '../../components/CustomButton'; // Assuming you've created this button component

/**
 * LoginPage Component
 * This component is responsible for rendering the login page. It contains a form where users can enter their username and password.
 * The form data is submitted to the backend via the onLogin function.
 */
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
