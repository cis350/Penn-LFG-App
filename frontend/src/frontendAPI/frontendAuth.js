// FROM STARTER CODE, UNCHANGED
// HTTP client
import axios from 'axios';
import { rootURL, setHeaders } from '../utils/apiUtils';
/**
 * This module contains HTTP calls to
 * the /login and /logout endpoints
 */

/**
 * This function authenticates the user
 * sends a POSt request to the login endpoint
 * returns the JWT
 */
export const loginUser = async (username, password) => {
  let response;
  try {
    // add JWT to headers
    setHeaders();
    response = await axios.post(`${rootURL}/login`, `username=${username}&password=${password}`);
    // return the token
  } catch (err) {
    console.log('error', err.message);
  }
  return response.data.apptoken;
};

export const logoutUser = async () => {
  let response;
  try {
    // add JWT to headers
    setHeaders();
    response = await axios.post(`${rootURL}/logout`);
    // return the token
  } catch (err) {
    console.log('error', err.message);
  }
  return response.status;
};
