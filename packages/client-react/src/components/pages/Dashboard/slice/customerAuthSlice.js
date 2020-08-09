import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';

const initialState = {
  token: null,
  user: null,
  loading: false,
  role: 'customer',
  ready: false,
};

const customerAuthSlice = createSlice({
  name: 'customerAuthSlice',
  initialState,
  reducers: {
    setStatus: (state, { payload: status }) => ({
      ...state,
      user: {
        ...state.user,
        status,
      },
    }),
    setLoading: (state, { payload: loading }) => ({
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
    clearAuth: () => ({
      ...initialState,
      ready: true,
    }),
    setReady: state => ({
      ...state,
      ready: true,
    }),
    setToken: (state, { payload: token }) => ({
      ...state,
      token,
    }),
  },
});

export const {
  setAuth,
  setReady,
  clearAuth,
  setLoading,
  setStatus,
  setToken,
} = customerAuthSlice.actions;

const saveSessionStorage = ({ token, user }) => {
  sessionStorage.setItem('customerAuth', JSON.stringify({ token, user }));
};

export const updatePassword = (token, newPassword, reject) => async (
  dispatch,
  getState
) => {
  const url = '/auth/updatePassword';
  try {
    dispatch(setLoading(true));
    const res = await axios.post(
      url,
      { newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setToken(res.data.token));
    saveSessionStorage(getState().customerAuth);
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const signIn = (loginData, resolve, reject) => async (
  dispatch,
  getState
) => {
  const url = '/auth/login';
  try {
    dispatch(setLoading(true));
    const res = await axios.post(url, loginData);
    dispatch(setAuth({ ...res.data }));
    saveSessionStorage(getState().customerAuth);
    resolve();
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const uploadPID = ({ fileData, token }, resolve, reject) => async (
  dispatch,
  getState
) => {
  const url = '/auth/updateIdentity';
  try {
    dispatch(setLoading(true));
    const res = await axios.post(url, fileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(setStatus('WAITING'));
    saveSessionStorage(getState().customerAuth);
    resolve(res);
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSessionStorage = () => dispatch => {
  try {
    const customerAuth = JSON.parse(sessionStorage.getItem('customerAuth'));
    if (customerAuth) dispatch(setAuth(customerAuth));
  } catch (error) {
    //
  } finally {
    dispatch(setReady());
  }
};

export const signOut = () => dispatch => {
  sessionStorage.setItem('customerAuth', '');
  dispatch(clearAuth());
};

export const customerSelector = state => [
  state.customerAuth.token,
  state.customerAuth.user,
];

export default customerAuthSlice.reducer;
