import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';
import { formatDatetime } from '../../../../utils';

const overviewMap = ({
  id,
  type,
  account_number: accountNumber,
  balance,
  currency_unit: currencyUnit,
  updatedAt,
}) => ({
  id,
  type,
  accountNumber,
  balance,
  currencyUnit,
  updatedAt: formatDatetime(updatedAt),
});

const accountMap = ({
  id,
  type,
  account_number: accountNumber,
  balance,
  currency_unit: currencyUnit,
  status,
  depositAccountDetail,
  updatedAt,
  createdAt,
  closed_date: closeAt,
}) => ({
  id,
  type,
  accountNumber,
  balance,
  currencyUnit,
  status,
  depositAccountDetail,
  updatedAt: formatDatetime(updatedAt),
  createdAt: formatDatetime(createdAt),
  closedAt: formatDatetime(closeAt),
});

const initialState = {
  accounts: [],
  loading: false,
  ready: false,
  selectedAccountId: null,
};

const customerAccountSlice = createSlice({
  name: 'customerAccountSlice',
  initialState,
  reducers: {
    setSelectedAccount: (state, { payload: selectedAccountId }) => ({
      ...state,
      selectedAccountId,
    }),
    setLoading: (state, { payload: loading }) => ({
      ...state,
      loading,
    }),
    setReady: state => ({
      ...state,
      ready: true,
    }),
    setAccounts: (state, { payload: accounts }) => ({
      ...state,
      accounts: [...accounts],
    }),
    setAccount: (state, { payload: account }) => ({
      ...state,
      accounts: state.accounts.map(a => {
        return a.id !== account.id ? { ...a } : account;
      }),
    }),
    addAccount: (state, { payload: account }) => ({
      ...state,
      accounts: [account, ...state.accounts],
    }),
  },
});

export const {
  setReady,
  setLoading,
  setAccounts,
  setAccount,
  setSelectedAccount,
  addAccount,
} = customerAccountSlice.actions;

export const fetchAccounts = (token, reject) => async dispatch => {
  const url = 'customer/account?all=true';
  try {
    dispatch(setLoading(true));
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setAccounts(res.data));
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const changeStatus = (token, id, reject) => async dispatch => {
  const url = `customer/account/${id}/status`;
  try {
    dispatch(setLoading(true));
    const res = await axios.put(url, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setAccount(res.data));
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const confirmDeposit = (token, id, reject) => async dispatch => {
  const url = `customer/account/${id}/confirm-deposit`;
  try {
    dispatch(setLoading(true));
    const res = await axios.put(url, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setAccount(res.data));
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const closed = (token, id, reject) => async dispatch => {
  const url = `customer/account/${id}/closed`;
  try {
    dispatch(setLoading(true));
    const res = await axios.put(url, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setAccount(res.data));
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createAccount = (token, data, reject) => async dispatch => {
  const url = `customer/account`;
  try {
    dispatch(setLoading(true));
    const res = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    dispatch(addAccount(res.data));
    dispatch(setSelectedAccount(res.data.id));
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const selectorOverviewAccounts = state => [
  ['Type', 'Account Number', 'Balance', 'Currency', 'Latest updating'],
  state.customerAccounts.accounts
    .filter(account => account.status === 'NORMAL')
    .map(overviewMap),
];

export const selectorAccounts = state => [
  ['Type', 'Account Number', 'Balance', 'Currency', 'Status'],
  state.customerAccounts.accounts
    .map(accountMap)
    .map(({ updatedAt, createdAt, closedAt, ...account }) => ({
      ...account,
    })),
];

export default customerAccountSlice.reducer;
