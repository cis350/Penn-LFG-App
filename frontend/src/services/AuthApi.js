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
    const errorJawn = {
      message: err.response.data.error,
      status: err.response.status,
    };
    // if there's no response attribute of the error, that means there was a
    // CONNECTION REFUSED error trying to connect to the backend, so just return null
    if (!errorJawn) {
      return null;
    }
    return errorJawn;
  }
  return response.data.token;
};

export const registerUser = async (username, password, fname, lname) => {
  let response;
  try {
    response = await axios.post(`${rootURL}/register`, {
      username, password, fname, lname,
    });
  } catch (err) {
    console.log('error', err.message);
    const errorJawn = {
      message: err.response.data,
      status: err.response.status,
    };
    // if there's no response attribute of the error, that means there was a
    // CONNECTION REFUSED error trying to connect to the backend, so just return null
    if (!errorJawn) {
      return null;
    }
    return errorJawn;
  }
  return response.data.token;
};

export const verifyUser = async () => {
  let response;
  try {
    setHeaders();
    response = await axios.post(`${rootURL}/verify`);
  } catch (err) {
    console.log('error', err.message);
    const errorJawn = {
      message: err.response.data,
      status: err.response.status,
    };
    // if there's no response attribute of the error, that means there was a
    // CONNECTION REFUSED error trying to connect to the backend, so just return null
    if (!errorJawn) {
      return null;
    }
    return errorJawn;
  }

  return response.status;
};

export const logoutUser = async () => {
  let response;
  try {
    // add JWT to headers
    setHeaders();
    response = await axios.post(`${rootURL}/logout`);
  } catch (err) {
    console.log('error', err.message);
  }
  console.log(response.status);
  return response.status;
};
