/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage';

// ADD MORE TESTS ONCE THIS BECOMES THE FEED PAGE
describe('HomePage', () => {
  test('renders Home content', () => {
    render(<Router><HomePage /></Router>);
    expect(screen.getByText(/Here is your posts feed./i)).toBeInTheDocument();
  });
});
