import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import CustomButton from '../../components/CustomButton';

/**
 * WelcomePage Component
 * This component is responsible for rendering the welcome page. It contains a brand logo, a title, a subtitle,
 * and a button group for users to login and register.
 */
function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1>
        <span className="brand-penn-title">Penn</span>
        <span className="brand-lfg-title"> LFG</span>
      </h1>
      <p className="subtitle">
        The premier app for finding study buddies, HW collaborators,
        and group project partners at the University of Pennsylvania.
      </p>
      <div className="button-group">
        <Link to="/login">
          <CustomButton variant="large">Login</CustomButton>
        </Link>
        <Link to="/register">
          <CustomButton variant="large">Register</CustomButton>
        </Link>
      </div>
      <footer className="footer">
        Built by Penn students, for Penn students. ♥
      </footer>
    </div>
  );
}

export default WelcomePage;
