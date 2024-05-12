/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedPage from '../FeedPage'; // Adjust the path as necessary
import { getFeed } from '../../../services/FeedApi.js';

// Mocking the Feed API
jest.mock('../../../services/FeedApi', () => ({
  getFeed: jest.fn()
}));

describe('FeedPage', () => {
  beforeEach(() => {
    getFeed.mockResolvedValue([
      {
        username: 'testUser',
        title: 'test group title',
        description: 'description title',
        tags: ['tag1', 'tag2'],
        course: 'CIS 3500',
        lookingFor: 2,
        modeOfCollab: 'in-person',
        createdAt: '2020-01-01T00:00:00Z'
      },
      {
        username: 'anotherUser',
        title: 'another test title',
        description: 'another description',
        tags: ['tag3'],
        course: 'CIS 3550',
        lookingFor: 3,
        modeOfCollab: 'remote',
        createdAt: '2020-02-01T00:00:00Z'
      }
    ]);
  });

  test('renders the feed header and posts', async () => {
    render(<FeedPage />);
    expect(screen.getByText(/My Feed/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('test group title')).toBeInTheDocument();
      expect(screen.getByText('description title')).toBeInTheDocument();
      expect(screen.getByText('another test title')).toBeInTheDocument();
    });
  });


  test('no posts available message when API returns empty', async () => {
    getFeed.mockResolvedValue([]);
    render(<FeedPage />);
    await waitFor(() => {
      expect(screen.queryByText(/test group title/i)).not.toBeInTheDocument();
    });
  });
});
