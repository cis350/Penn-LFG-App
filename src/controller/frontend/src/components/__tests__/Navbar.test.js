import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar', () => {
  test('renders Navbar with appropriate links when not logged in', () => {
    render(<Router><Navbar isLoggedIn={false} /></Router>);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('renders Navbar with logout link when logged in', () => {
    const mockLogout = jest.fn();
    render(<Router><Navbar isLoggedIn={true} onLogout={mockLogout} /></Router>);
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
