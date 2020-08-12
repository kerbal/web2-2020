import { getSessionStorage } from '../slice/adminAuthSlice';

export const checkLoginState = () => {
  const adminAuth = getSessionStorage();
  if (adminAuth) {
    return true;
  }
  return false;
};

export const checksfac = () => {
  return 0;
};
