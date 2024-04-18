import React from 'react';
// import Navbar from './Navbar';
import './css/Header.css';

const Header = ({ isLoggedIn }) => {
  return (
    <header className="header">
      <h1 className="brand-logo">
        <span className="brand-penn">Penn</span>
        <span className="brand-lfg"> LFG</span>
      </h1>
      {/* <Navbar isLoggedIn={isLoggedIn} /> */}
    </header>
  );
};

export default Header;
