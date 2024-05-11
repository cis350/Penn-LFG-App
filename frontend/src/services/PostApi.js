import axios from 'axios';
import { rootURL, setHeaders } from '../utils/ApiUtils';

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

export const updatePost = async (postId, updateFields) => {
  let response;
  try {
    setHeaders();
    response = await axios.put(`${rootURL}/post/${postId}`, updateFields);
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
