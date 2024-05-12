import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditPostPage from '../EditPostPage';
import { getPost, updatePost, deletePost } from '../../../services/PostApi';
import { useNavigate } from 'react-router-dom';

jest.mock('../../../services/PostApi', () => ({
  getPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('EditPostPage', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => '1'); // Mocking localStorage.getItem for 'posts'
    useNavigate.mockImplementation(() => jest.fn()); // Mocking navigate function
    getPost.mockResolvedValue({
      post: {
        title: 'Existing Post',
        description: 'Existing Description',
        course: 'CIS 300',
        lookingFor: 3,
        modeOfCollab: 'Online',
        tags: ['tag1', 'tag2']
      }
    });
  });

  test('loads and displays the existing post', async () => {
    render(<EditPostPage />);
    await waitFor(() => {
      expect(screen.getByDisplayValue('Existing Post')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Existing Description')).toBeInTheDocument();
    });
  });


  test('deletes the post and navigates back', async () => {
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);
    deletePost.mockResolvedValue({ status: 200 });

    render(<EditPostPage />);
    fireEvent.click(screen.getByText(/Delete Post/i));

    await waitFor(() => {
      expect(deletePost).toHaveBeenCalledWith('1');
      expect(navigateMock).toHaveBeenCalledWith('/account');
    });
  });
});
