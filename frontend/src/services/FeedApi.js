import axios from 'axios';
import { rootURL, setHeaders } from '../utils/ApiUtils';
/**
 * This file contains API calls related to the feed functionalities.
 * It uses axios for making HTTP requests to the backend server.
 */

export const getFeed = async () => {
  let response;
  try {
    response = await axios.get(`${rootURL}/posts`);
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
 * This function fetches the user's feed by making a GET request to the /myposts endpoint.
 * It sets the necessary headers before making the request.
 * If the request is successful, it returns the response data.
 * If there's an error, it logs the error message and returns a structured error object.
 */
export const getMyFeed = async () => {
  let response;
  setHeaders();
  try {
    response = await axios.get(`${rootURL}/myposts`);
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
