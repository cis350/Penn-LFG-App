import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationPage from '../RegistrationPage'; // Adjust the path as necessary

describe('RegistrationPage', () => {
  test('renders input fields for registration details', () => {
    render(<RegistrationPage />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
  });

  test('renders register button', () => {
    render(<RegistrationPage />);
    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(registerButton).toBeInTheDocument();
  });

  test('allows input entry for registration fields', () => {
    render(<RegistrationPage />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe' } });
    expect(screen.getByPlaceholderText('username').value).toBe('newuser');
    expect(screen.getByPlaceholderText('password').value).toBe('newpassword123');
    expect(screen.getByPlaceholderText('first name').value).toBe('John');
    expect(screen.getByPlaceholderText('last name').value).toBe('Doe');
  });

  test('register button triggers registration process', () => {
    const mockRegister = jest.fn();
    render(<RegistrationPage onRegister={mockRegister} />);
    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);
    expect(mockRegister).toHaveBeenCalled();
  });
});
