import axios from 'axios';
import { rootURL, setHeaders } from '../utils/ApiUtils';

/**
 * This function creates a new post by making a POST request to the /post endpoint.
 * It sets the necessary headers before making the request.
 * If the request is successful, it returns the response data.
 * If there's an error, it logs the error message and returns a structured error object.
 */
export const createPost = async (title, description, course, lookingFor, modeOfCollab, tags) => {
  let response;
  try {
    setHeaders();
    response = await axios.post(`${rootURL}/post`, {
      title, description, course, lookingFor, modeOfCollab, tags,
    });
  } catch (err) {
    console.log('error', err.message);
    if (!err.response) {
      return null;
    }
    const errorJawn = {
      message: err.response.data.error,
      status: err.response.status,
    };
    return errorJawn;
  }
  return response.data;
};

/**
 * This function updates a post by making a PUT request to the /post endpoint.
 * It sets the necessary headers before making the request.
 * If the request is successful, it returns the response data.
 * If there's an error, it logs the error message and returns a structured error object.
 */
export const updatePost = async (
  postId,
  title,
  description,
  course,
  lookingFor,
  modeOfCollab,
  tags,
) => {
  let response;
  try {
    setHeaders();
    response = await axios.put(`${rootURL}/post/${postId}`, {
      title, description, course, lookingFor, modeOfCollab, tags,
    });
  } catch (err) {
    console.log('Error updating post:', err.message);
    if (!err.response) {
      return null;
    }
    return {
      message: err.response.data.error,
      status: err.response.status,
    };
  }
  return response.data;
};

/**
 * This function deletes a post by making a DELETE request to the /post endpoint.
 * It sets the necessary headers before making the request.
 * If the request is successful, it returns the response status.
 * If there's an error, it logs the error message and returns a structured error object.
 */
export const deletePost = async (postId) => {
  let response;
  try {
    setHeaders();
    response = await axios.delete(`${rootURL}/post/${postId}`);
  } catch (err) {
    console.log('Error deleting post:', err.message);
    if (!err.response) {
      return null;
    }
    return {
      message: err.response.data.error,
      status: err.response.status,
    };
  }
  return response.data;
};

/**
 * This function fetches a post by making a GET request to the /mypost endpoint.
 * It sets the necessary headers before making the request.
 * If the request is successful, it returns the response data.
 * If there's an error, it logs the error message and returns a structured error object.
 */
export const getPost = async (postId) => {
  console.log('got to getPost');
  let response;
  try {
    setHeaders();
    response = await axios.get(`${rootURL}/mypost/${postId}`);
  } catch (err) {
    console.log('Error getting post:', err.message);
    if (!err.response) {
      return null;
    }
    return {
      message: err.response.data.error,
      status: err.response.status,
    };
  }
  return response.data;
};
