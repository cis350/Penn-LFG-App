import axios from 'axios';
import { rootURL, setHeaders } from '../utils/ApiUtils';

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
