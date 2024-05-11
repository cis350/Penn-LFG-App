import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import CustomButton from './CustomButton';

function Navbar({ isLoggedIn, onLogout }) {
  const handleClick = (event) => {
    event.preventDefault();
    onLogout(); // Call the passed-in login handler
  };

  return (
    <nav className="navbar">
      {isLoggedIn ? (
        <>
          <Link to="/create-post" className="active-link">Create Posts +</Link>
          <Link to="/account" className="active-link">My Account</Link>
          <CustomButton variant="small" onClick={handleClick}>Logout</CustomButton>
        </>
      ) : (
        <>
          <Link to="/about" className="active-link">About</Link>
          <Link to="/contact" className="active-link">Contact</Link>
          <Link to="/login">
            <CustomButton variant="small">Login</CustomButton>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
