// TAKEN STRAIGHT FROM STARTER CODE, NOT EDITED
// HTTP client
import { axios } from 'axios';
import { rootURL, setHeaders } from '../utils/apiUtils';

/**
 * get all the users from the backend
 */
export const getAllUsers = async () => {
  // always use try/catch in an async function
  let response;
  try {
    response = await axios.get(`${rootURL}/users`);
    console.log('all students', response.data);
  } catch (err) {
    console.error('error', err.message);
  }
  return response.data.data;
};

/**
 * Get a user by their id
 */

export const getUserById = async (id) => {
  // always use try/catch in an async function
  let response;
  try {
    response = await axios.get(`${rootURL}/user/${id}`);
    console.log('A user', response.data);
  } catch (err) {
    console.error('error', err.message);
  }
  return response.data.data;
};

/**
 * Create a new user
 */

export const createNewUser = async (userObject) => {
  // always use try/catch in an async function
  let response;
  try {
    // add the token to the header
    setHeaders();
    response = await axios.post(
      `${rootURL}/user`,
      `name=${userObject.name}&email=${userObject.email}&major=${userObject.major}`,
    );
    console.log('A response', response.data);
  } catch (err) {
    console.error('error', err.message);
  }
  return response.data.data;
};
