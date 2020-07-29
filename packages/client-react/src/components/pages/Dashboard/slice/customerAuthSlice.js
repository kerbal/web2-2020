import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';

const initialState = {
  token: null,
  user: null,
  loading: false,
  role: 'customer',
};
export const customerAuthSlice = createSlice({
  name: 'lading',
  initialState,
  reducers: {
    setStatus: (state, status) => ({
      ...state,
      user: {
        ...state.user,
        status,
      },
    }),
    setLoading: (state, loading) => ({
      ...state,
      loading,
    }),
    setAuth: (state, { payload: { token, user } }) => ({
      ...state,
      token,
      user: {
        ...user,
      },
    }),
    clearAuth: () => initialState,
  },
});

export const {
  setAuth,
  clearAuth,
  setLoading,
  setStatus,
} = customerAuthSlice.actions;

export const signIn = (loginData, resolve, reject) => async dispatch => {
  const url = '/auth/login';
  try {
    dispatch(setLoading(true));
    const res = await axios.post(url, loginData);
    dispatch(setAuth({ ...res.data }));
    sessionStorage.setItem('customerAuth', JSON.stringify({ ...res.data }));
    resolve();
  } catch ({ response }) {
    reject(response);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSessionStorage = () => dispatch => {
  const customerAuth = JSON.parse(sessionStorage.getItem('customerAuth'));
  if (customerAuth) dispatch(setAuth(customerAuth));
};

export const signOut = () => dispatch => {
  sessionStorage.setItem('customerAuth', '');
  dispatch(clearAuth());
};

export default customerAuthSlice.reducer;
