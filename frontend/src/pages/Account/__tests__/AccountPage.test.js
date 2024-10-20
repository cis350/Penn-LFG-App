import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountPage from '../AccountPage';
import { getMyFeed } from '../../../services/FeedApi.js';
import { useNavigate } from 'react-router-dom';

// Mocking the navigation and Feed API
jest.mock('../../../services/FeedApi', () => ({
  getMyFeed: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('AccountPage', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 'username');
    useNavigate.mockImplementation(() => jest.fn());
  });

  test('renders "My Posts" header', () => {
    render(<AccountPage />);
    expect(screen.getByText(/My Posts/i)).toBeInTheDocument();
  });

  test('fetches and displays user posts', async () => {
    getMyFeed.mockResolvedValue([
      { _id: '1', owner: 'username', title: 'Post Title 1', description: 'Description 1', tags: ['tag1'], course: 'CIS 101', lookingFor: 3, modeOfCollab: 'Online', createdAt: '2021-01-01T00:00:00Z' }
    ]);
    render(<AccountPage />);
    await waitFor(() => {
      expect(screen.getByText('Post Title 1')).toBeInTheDocument();
    });
  });

  test('displays a message when no posts are available', async () => {
    getMyFeed.mockResolvedValue([]);
    render(<AccountPage />);
    await waitFor(() => {
      expect(screen.queryByText(/Post Title/i)).not.toBeInTheDocument();
    });
  });

  test('handles navigation to edit post when edit is clicked', async () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    getMyFeed.mockResolvedValue([
      { _id: '1', owner: 'username', title: 'Post Title 1', description: 'Description 1', tags: ['tag1'], course: 'CIS 101', lookingFor: 3, modeOfCollab: 'Online', createdAt: '2021-01-01T00:00:00Z' }
    ]);
    render(<AccountPage />);
    await waitFor(() => {
      const editButton = screen.getByText(/edit/i);
      fireEvent.click(editButton);
    });
    expect(navigate).toHaveBeenCalledWith('/edit-post');
  });
});
