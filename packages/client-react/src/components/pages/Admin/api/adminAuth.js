import apiCaller from './apiCaller';

export const signIn = async (username, password) => {
  try {
    const path = '/admin/auth/login';
    const data = {
      email: username,
      password,
    };
    const result = await apiCaller('POST', path, JSON.stringify(data));
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const signOut = async () => {
  return 0;
};
