import axios from 'axios';
import { rootURL, setHeaders } from '../utils/apiUtils';
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
    // add JWT to headers
    setHeaders();
    response = await axios.post(`${rootURL}/login`, { username, password });
    // return the token
  } catch (err) {
    console.log('error', err.message);
  }

  // if the database if offline, pass that error up to the frontend
  if (!response) {
    return null;
  }

  return response.data.token;
};

export const registerUser = async (username, password, fname, lname) => {
  let response;
  try {
    // add JWT to headers
    setHeaders();
    response = await axios.post(`${rootURL}/register`, {
      username, password, fname, lname,
    });
  } catch (err) {
    console.log('error', err.message);
  }

  // if the database if offline, pass that error up to the frontend
  if (!response) {
    return null;
  }

  return response.data.token;
};

// export const logoutUser = async () => {
//   let response;
//   try {
//     // add JWT to headers
//     setHeaders();
//     response = await axios.post(`${rootURL}/logout`);
//     // return the token
//   } catch (err) {
//     console.log('error', err.message);
//   }
//   return response.status;
// };
