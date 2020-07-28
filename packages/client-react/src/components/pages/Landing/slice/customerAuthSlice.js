import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  user: null,
  loading: false,
};
export const customerAuthSlice = createSlice({
  name: 'lading',
  initialState,
  reducers: {
    setLoading: (state, loading) => ({
      ...state,
      loading,
    }),
    setAuth: (state, { payload: { token, user } }) => ({
      ...state,
      token,
      user,
    }),
    signOut: () => initialState,
  },
});

export const {
  setAuth,
  signOut,
  setLoading,
  setError,
} = customerAuthSlice.actions;

export const signIn = (loginData, resolve, reject) => async dispatch => {
  const url = 'https://piggy-bank-api.herokuapp.com/api/auth/login';
  try {
    dispatch(setLoading(true));
    const res = await axios.post(url, loginData);
    dispatch(setAuth(res.data));
    resolve();
  } catch ({ response }) {
    reject(response);
  } finally {
    dispatch(setLoading(false));
  }
};
export default customerAuthSlice.reducer;
