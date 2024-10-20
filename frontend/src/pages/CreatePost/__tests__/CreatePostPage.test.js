import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePostPage from '../CreatePostPage';
import { createPost } from '../../../services/PostApi';
import { useNavigate } from 'react-router-dom';

jest.mock('../../../services/PostApi', () => ({
  createPost: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('CreatePostPage', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => navigateMock);
    createPost.mockClear();
    navigateMock.mockClear();
  });

  test('renders CreatePostPage with form inputs', () => {
    render(<CreatePostPage />);
    expect(screen.getByLabelText(/Post title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Post description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Course name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/How many group members are you looking for\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create post/i })).toBeInTheDocument();
  });

  test('allows input entry in form fields', () => {
    render(<CreatePostPage />);
    const titleInput = screen.getByLabelText(/Post title/i);
    fireEvent.change(titleInput, { target: { value: 'New Course Post' } });
    expect(titleInput.value).toBe('New Course Post');
  });

  test('submits form and calls create post API', async () => {
    createPost.mockResolvedValue({ status: 200 });

    render(<CreatePostPage />);
    fireEvent.change(screen.getByLabelText(/Post title/i), { target: { value: 'New Course Post' } });
    fireEvent.change(screen.getByLabelText(/Post description/i), { target: { value: 'Description of new course' } });
    fireEvent.change(screen.getByLabelText(/Course name/i), { target: { value: 'CIS 3500' } });
    fireEvent.change(screen.getByLabelText(/How many group members are you looking for\?/i), { target: { value: '3' } });

    const submitButton = screen.getByRole('button', { name: /create post/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(createPost).toHaveBeenCalledWith(
            'New Course Post',
            'Description of new course',
            'CIS 3500',
            3,
            '',
            []
        );
    });
});

test('navigates to feed after successful post creation', async () => {
    createPost.mockResolvedValue({ status: 200 });

    render(<CreatePostPage />);
    const submitButton = screen.getByRole('button', { name: /create post/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(navigateMock).toHaveBeenCalledWith('/feed');
    });
});


  test('handles cancellation and navigates back to feed', () => {
    render(<CreatePostPage />);
    const cancelButton = screen.getByText(/cancel post/i);
    fireEvent.click(cancelButton);
    expect(navigateMock).toHaveBeenCalledWith('/feed');
  });
});
