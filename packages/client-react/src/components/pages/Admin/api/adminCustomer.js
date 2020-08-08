import apiCaller from './apiCaller';

export const getAllCustomer = async (page, pageSize = 5, token) => {
  try {
    const path = `/user/all?limit=${pageSize}&page=${page}`;
    const result = await apiCaller('GET', path, {}, token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};

export const searchCustomer = async (page, pageSize = 5, token, searchString) => {
  try {
    const path = `/user/all?limit=${pageSize}&page=${page}&pattern=${searchString}`;
    const result = await apiCaller('GET', path, {}, token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};

export const signOut = async () => {
  return 0;
};
