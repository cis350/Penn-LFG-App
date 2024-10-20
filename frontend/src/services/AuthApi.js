import axios from 'axios';
import { rootURL, setHeaders } from '../utils/ApiUtils';
/**
 * This module contains HTTP calls to
 * the /login and /logout endpoints
 */

/**
 * This function authenticates the user
 * sends a POST request to the login endpoint
 * returns the JWT
 */
export const loginUser = async (username, password) => {
  let response;
  try {
    response = await axios.post(`${rootURL}/login`, { username, password });
    // return the token
  } catch (err) {
    console.log('error', err);
    if (!err.response) { // checks if the database is offline
      return null;
    }
    const errorJawn = {
      message: err.response.data.error,
      status: err.response.status,
    };
    return errorJawn;
  }
  return response.data.token;
};
/**
 * This function logs out the user
 * sends a POST request to the logout endpoint
 * and handles the response or any errors that may occur.
 */

export const registerUser = async (username, password, fname, lname) => {
  let response;
  try {
    response = await axios.post(`${rootURL}/register`, {
      username, password, fname, lname,
    });
  } catch (err) {
    console.log('error', err.message);
    if (!err.response) { // checks if the database is offline
      return null;
    }
    const errorJawn = {
      message: err.response.data.error,
      status: err.response.status,
    };
    return errorJawn;
  }
  return response.data.token;
};

// will be used for checking if the user's token is still valid when the
// user tries to navigate to other logged-in-necessary pages
export const verifyUser = async () => {
  let response;
  try {
    setHeaders();
    response = await axios.post(`${rootURL}/verify`);
  } catch (err) {
    console.log('error', err.message);
    if (!err.response) { // checks if the database is offline
      return null;
    }
    const errorJawn = {
      message: err.response.data.error,
      status: err.response.status,
    };
    return errorJawn;
  }

  return response.status;
};
/**
 * This function verifies the user's token by sending a POST request to the verify endpoint.
 * It sets the necessary headers before making the request.
 * If the request is successful, it returns the response status.
 * In case of an error (e.g., network issues, server errors), it logs the error message,
 * checks if the database is offline (no response from server), and returns a structured error
 * object. This function is crucial for maintaining secure access to features that require user
 * authentication.
 */

export const logoutUser = async () => {
  let response;
  try {
    // add JWT to headers
    setHeaders();
    response = await axios.post(`${rootURL}/logout`);
  } catch (err) {
    console.log('error', err.message);
    if (!err.response) { // checks if the database is offline
      return null;
    }
    const errorJawn = {
      message: err.response.data.error,
      status: err.response.status,
    };
    return errorJawn;
  }

  return response;
};
