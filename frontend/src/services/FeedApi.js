import axios from 'axios';
import { rootURL } from '../utils/ApiUtils';

const getFeed = async () => {
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

const getMyFeed = async () => {
  let response;
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

export default getFeed;
