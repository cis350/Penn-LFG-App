import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import CustomButton from './CustomButton';

function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      {isLoggedIn ? (
        <>
          <Link to="/dashboard" className="active-link">Dashboard</Link>
          <CustomButton variant="small">Logout</CustomButton>
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
