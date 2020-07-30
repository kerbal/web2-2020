import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';
import { formatDatetime } from '../../../../utils';

const initialState = {
  accounts: [],
  loading: false,
  ready: false,
};

const customerAccountSlice = createSlice({
  name: 'customerAccountSlice',
  initialState,
  reducers: {
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
      accounts: [...state.accounts, ...accounts],
    }),
    setAccount: (state, { payload: account }) => ({
      ...state,
      accounts: state.accounts.map(a => {
        return a.id !== account.id ? { ...a } : account;
      }),
    }),
  },
});

export const {
  setReady,
  setLoading,
  setAccounts,
  setAccount,
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

export const selectorOverviewAccounts = state => [
  ['Type', 'Account Number', 'Balance', 'Currency Unit', 'Latest updating'],
  state.customerAccounts.accounts
    .filter(account => account.status === 'NORMAL')
    .map(
      ({
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
      })
    ),
];

export const selectorAccounts = state => [
  [
    'Type',
    'Account Number',
    'Balance',
    'Currency Unit',
    'Status',
    'Latest updated at',
    'Created at',
    'Closed at',
  ],
  state.customerAccounts.accounts.map(
    ({
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
      closeAt: closeAt ? formatDatetime(closeAt) : '',
    })
  ),
];

export default customerAccountSlice.reducer;
