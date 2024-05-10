import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './css/Header.css';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="brand-logo">
          <span className="brand-penn">Penn</span>
          <span className="brand-lfg"> LFG</span>
        </h1>
      </Link>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
    </header>
  );
}

export default Header;
