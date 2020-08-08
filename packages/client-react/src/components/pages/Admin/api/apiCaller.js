import axios from 'axios';

export default (method = 'GET', path, data, token) => {
  return axios({
    method,
    url: `${process.env.REACT_APP_API_URL ||
      'https://piggy-bank-api.herokuapp.com/api'}${path}`,
    data,
    headers: token
      ? {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      : {
        'Content-Type': 'application/json',
      },
  });
};
