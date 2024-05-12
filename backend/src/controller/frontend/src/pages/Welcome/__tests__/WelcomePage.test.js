/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import WelcomePage from '../WelcomePage'; // Adjust the path as necessary

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Router>{ui}</Router>);
};

describe('WelcomePage', () => {
  test('renders Welcome message', () => {
    renderWithRouter(<WelcomePage />);
    const welcomeMessage = screen.getByText(/premier app for finding study buddies/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders login and register navigation buttons', () => {
    renderWithRouter(<WelcomePage />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('navigation to login page works', () => {
    renderWithRouter(<WelcomePage />);
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    expect(window.location.pathname).toBe('/login');
  });

  test('navigation to registration page works', () => {
    renderWithRouter(<WelcomePage />);
    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);
    expect(window.location.pathname).toBe('/register');
  });
});
