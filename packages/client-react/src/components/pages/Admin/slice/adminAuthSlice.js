import { createSlice } from '@reduxjs/toolkit';
import { signIn as CallSignInApi } from '../api/adminAuth';

const initialState = {
  token: null,
  user: null,
  loading: false,
  role: 'admin',
  ready: false,
};

export const adminAuthSlice = createSlice({
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
    setLoading: (state, { payload }) => ({
      ...state,
      loading: payload,
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
  },
});

export const {
  setAuth,
  setReady,
  clearAuth,
  setLoading,
  setStatus,
} = adminAuthSlice.actions;

export const signIn = (username, password) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await CallSignInApi(username, password);
    sessionStorage.setItem('adminAuth', JSON.stringify({ ...res.data }));
    dispatch(setAuth({ ...res.data }));
    dispatch(setLoading(false));
  } catch ({ response }) {
    console.log(response);
    dispatch(setLoading(false));
  }
};

export const getSessionStorage = () => {
  try {
    const adminAuth = JSON.parse(sessionStorage.getItem('adminAuth'));
    return adminAuth;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSessionStorage = () => dispatch => {
  try {
    const adminAuth = JSON.parse(sessionStorage.getItem('adminAuth'));
    if (adminAuth) dispatch(setAuth(adminAuth));
  } catch (error) {
    //
  } finally {
    dispatch(setReady());
  }
};

export const signOut = () => dispatch => {
  sessionStorage.setItem('adminAuth', '');
  dispatch(clearAuth());
};

export default adminAuthSlice.reducer;
