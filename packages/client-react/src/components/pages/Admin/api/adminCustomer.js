import apiCaller from './apiCaller';

export const getAllCustomers = async (page, pageSize = 5, token) => {
  try {
    const path = `/user/all?limit=${pageSize}&page=${page}`;
    const result = await apiCaller('GET', path, {}, token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};

export const searchCustomers = async (
  page,
  pageSize = 5,
  token,
  searchString
) => {
  try {
    const path = `/user/search?limit=${pageSize}&page=${page}&pattern=${searchString}`;
    const result = await apiCaller('GET', path, {}, token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};

export const getCustomerById = async (id, token) => {
  try {
    const path = `/user/${id}`;
    const result = await apiCaller('GET', path, {}, token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};

export const getCustomerDetailById = async (id, token) => {
  try {
    const path = `/admin/user/${id}`;
    const result = await apiCaller('GET', path, {}, token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};

export const topupAnAccount = async (accountId, amount, token) => {
  try {
    const path = `/admin/transaction`;
    const data = {
      account_id: accountId,
      amount,
      note: 'chuyen tien vao tai khoan',
    };
    const result = await apiCaller('POST', path, JSON.stringify(data), token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};

export const getPIDImages = async (accountId, amount, token) => {
  try {
    const path = `/admin/transaction`;
    const data = {
      account_id: accountId,
      amount,
      note: 'chuyen tien vao tai khoan',
    };
    const result = await apiCaller('GET', path, JSON.stringify(data), token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};

export const verifyCustomer = async (id, token) => {
  try {
    const path = `/admin/auth/verifyCusomer`;
    const data = {
      customer_id: id,
    };
    const result = await apiCaller('POST', path, JSON.stringify(data), token);
    return result;
  } catch (e) {
    console.log(e);
  }
  return 1;
};
