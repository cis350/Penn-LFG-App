import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/Navbar.css';

function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <NavLink to="/about" activeClassName="active-link">About</NavLink>
      <NavLink to="/contact" activeClassName="active-link">Contact</NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink>
          <button className="logout-button">Log Out</button>
        </>
      ) : (
        <>
          <NavLink to="/login" activeClassName="active-link">Login</NavLink>
          <NavLink to="/register" activeClassName="active-link">Register</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
