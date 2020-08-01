import axios from 'axios';

export default (method = 'GET', path, data) => {
  return axios({
    method,
    url: `${process.env.REACT_APP_API_URL ||
      'https://piggy-bank-api.herokuapp.com/api'}${path}`,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
