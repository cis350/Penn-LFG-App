/**
 * Utilities functions used by API calls
 * functions
 */
import axios from 'axios';
export const setHeaders = () => {
  axios.defaults.headers.common.Authorization = localStorage.getItem('app-token');
};

export const rootURL = 'http://localhost:5050';
