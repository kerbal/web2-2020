import axios from 'axios';

export default axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'https://piggy-bank-api.herokuapp.com/api',
  baseURL: process.env.REACT_APP_LOCAL_API_URL
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_API_URL,
});
