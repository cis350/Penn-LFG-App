/**
 * Utilities functions used by API calls
 * functions
 */
import axios from 'axios';
export const setHeaders = () => {
  axios.defaults.headers.common.Authorization = localStorage.getItem('app-token');
};

export const rootURL = 'https://penn-lfg-83d73b36926c.herokuapp.com/api';
