import React from 'react';
import './css/RegistrationPage.css';
import CustomButton from './CustomButton'; // Assuming you've created this button component

function RegistrationPage({ onRegister, username, onUsernameChange, 
  password, onPasswordChange, fname, onFnameChange, lname, onLnameChange }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(); // Call the passed-in register handler
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h1>Register a new account</h1>
        <p>Enter your credentials to make a PennLFG Account</p>
        <form className="registration-form" onSubmit={handleSubmit}>
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
          <input 
            type="text"
            value={fname}
            placeholder="first name"
            onChange={onFnameChange}
          />
          <input 
            type="text"
            value={lname}
            placeholder="last name"
            onChange={onLnameChange}
          />
          <CustomButton variant="large" type="submit">Register</CustomButton>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
