import axios from 'axios';
import { getFeed, getMyFeed } from '../FeedApi';  // Adjust the import path as necessary
import { loginUser, registerUser, verifyUser, logoutUser } from '../AuthApi';
import { createPost, updatePost, deletePost, getPost } from '../PostApi';
import { rootURL } from '../../utils/ApiUtils';

jest.mock('axios');


describe('AuthApi', () => {
  describe('loginUser', () => {
    it('successfully logs in the user and returns a token', async () => {
      const token = 'fake-jwt-token';
      axios.post.mockResolvedValue({ data: { token } });

      const result = await loginUser('testuser', 'password123');

      expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/login', {
        username: 'testuser',
        password: 'password123'
      });
      expect(result).toEqual(token);
    });

    it('handles login failure due to network issues', async () => {
      axios.post.mockRejectedValue({
        response: null
      });

      const result = await loginUser('testuser', 'password123');

      expect(result).toEqual(null);
    });

    it('handles login failure with error response', async () => {
      axios.post.mockRejectedValue({
        response: {
          data: { error: 'Invalid credentials' },
          status: 401
        }
      });

      const result = await loginUser('testuser', 'password123');

      expect(result).toEqual({
        message: 'Invalid credentials',
        status: 401
      });
    });
  });

  describe('registerUser', () => {
    it('successfully registers a user and returns a token', async () => {
      const token = 'new-fake-jwt-token';
      axios.post.mockResolvedValue({ data: { token } });

      const result = await registerUser('newuser', 'password123', 'John', 'Doe');

      expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/register', {
        username: 'newuser',
        password: 'password123',
        fname: 'John',
        lname: 'Doe'
      });
      expect(result).toEqual(token);
    });

    it('handles registration failure due to network issues', async () => {
      axios.post.mockRejectedValue({
        response: null
      });

      const result = await registerUser('newuser', 'password123', 'John', 'Doe');

      expect(result).toEqual(null);
    });

    it('handles registration failure with error response', async () => {
      axios.post.mockRejectedValue({
        response: {
          data: { error: 'Username exists' },
          status: 409
        }
      });

      const result = await registerUser('newuser', 'password123', 'John', 'Doe');

      expect(result).toEqual({
        message: 'Username exists',
        status: 409
      });
    });
  });

  describe('verifyUser', () => {
    it('successfully verifies the user and returns the status code', async () => {
      axios.post.mockResolvedValue({ status: 200 });

      const result = await verifyUser();

      expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/verify');
      expect(result).toEqual(200);
    });
  });

  describe('logoutUser', () => {
    it('successfully logs out the user', async () => {
      axios.post.mockResolvedValue({ status: 200 });

      const result = await logoutUser();

      expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/logout');
      expect(result).toMatchObject({ status: 200 });
    });
  });
});


describe('FeedApi', () => {
  describe('getFeed', () => {
    it('fetches successfully data from an API', async () => {
      const posts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ];
      axios.get.mockResolvedValue({ data: posts });

      const result = await getFeed();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:5050/posts');
      expect(result).toEqual(posts);
    });

    it('fetches data with an error', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      );

      const result = await getFeed();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:5050/posts');
      expect(result).toEqual(null);
    });
  });

  describe('getMyFeed', () => {
    it('fetches successfully data from an API', async () => {
      const myPosts = [
        { id: 1, title: 'My Post 1' },
        { id: 2, title: 'My Post 2' }
      ];
      axios.get.mockResolvedValue({ data: myPosts });

      const result = await getMyFeed();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:5050/myposts');
      expect(result).toEqual(myPosts);
    });

    it('fetches data with an error', async () => {
      const errorMessage = 'Server Error';
      axios.get.mockRejectedValue({
        response: {
          data: { error: errorMessage },
          status: 404
        }
      });

      const result = await getMyFeed();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:5050/myposts');
      expect(result).toEqual({
        message: errorMessage,
        status: 404
      });
    });
  });
});

describe('PostApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('creates a post successfully and returns post data', async () => {
      const postData = { id: 1, title: 'New Post', description: 'A new post' };
      axios.post.mockResolvedValue({ data: postData });

      const result = await createPost('New Post', 'A new post', 'Intro to Testing', 5, 'online', ['testing', 'react']);

      expect(axios.post).toHaveBeenCalledWith(`${rootURL}/post`, {
        title: 'New Post', 
        description: 'A new post',
        course: 'Intro to Testing', 
        lookingFor: 5, 
        modeOfCollab: 'online', 
        tags: ['testing', 'react']
      });
      expect(result).toEqual(postData);
    });

    it('handles errors on creating a post', async () => {
      const errorMessage = 'Error creating post';
      axios.post.mockRejectedValue({
        response: {
          data: { error: errorMessage },
          status: 400
        }
      });

      const result = await createPost('New Post', 'A new post', 'Intro to Testing', 5, 'online', ['testing', 'react']);

      expect(result).toEqual({
        message: errorMessage,
        status: 400
      });
    });
  });

  describe('updatePost', () => {
    it('updates a post successfully and returns updated data', async () => {
      const updatedData = { id: 1, title: 'Updated Post' };
      axios.put.mockResolvedValue({ data: updatedData });

      const result = await updatePost(1, 'Updated Post', 'Updated description', 'Advanced Testing', 10, 'remote', ['advanced']);

      expect(axios.put).toHaveBeenCalledWith(`${rootURL}/post/1`, {
        title: 'Updated Post', 
        description: 'Updated description',
        course: 'Advanced Testing', 
        lookingFor: 10, 
        modeOfCollab: 'remote', 
        tags: ['advanced']
      });
      expect(result).toEqual(updatedData);
    });

    it('handles errors on updating a post', async () => {
      const errorMessage = 'Error updating post';
      axios.put.mockRejectedValue({
        response: {
          data: { error: errorMessage },
          status: 404
        }
      });

      const result = await updatePost(1, 'Updated Post', 'Updated description', 'Advanced Testing', 10, 'remote', ['advanced']);

      expect(result).toEqual({
        message: errorMessage,
        status: 404
      });
    });
  });

  describe('deletePost', () => {
    it('deletes a post successfully', async () => {
      axios.delete.mockResolvedValue({ status: 204 });

      const result = await deletePost(1);

      expect(axios.delete).toHaveBeenCalledWith(`${rootURL}/post/1`);
    });

    it('handles errors on deleting a post', async () => {
      const errorMessage = 'Error deleting post';
      axios.delete.mockRejectedValue({
        response: {
          data: { error: errorMessage },
          status: 404
        }
      });

      const result = await deletePost(1);

      expect(result).toEqual({
        message: errorMessage,
        status: 404
      });
    });
  });

  describe('getPost', () => {
    it('retrieves a post successfully', async () => {
      const postData = { id: 1, title: 'Existing Post' };
      axios.get.mockResolvedValue({ data: postData });

      const result = await getPost(1);

      expect(axios.get).toHaveBeenCalledWith(`${rootURL}/mypost/1`);
      expect(result).toEqual(postData);
    });

    it('handles errors on retrieving a post', async () => {
      const errorMessage = 'Error getting post';
      axios.get.mockRejectedValue({
        response: {
          data: { error: errorMessage },
          status: 404
        }
      });

      const result = await getPost(1);

      expect(result).toEqual({
        message: errorMessage,
        status: 404
      });
    });
  });
});

