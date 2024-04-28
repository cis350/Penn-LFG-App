/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header'; // Adjust the path as necessary

describe('Header', () => {
  test('renders Header with navigation links', () => {
    render(<Router><Header isLoggedIn={false} /></Router>);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('renders different links when logged in', () => {
    render(<Router><Header isLoggedIn={true} /></Router>);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).toBeNull();
  });
});
