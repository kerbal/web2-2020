import React, { useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from './slice/customerAccountSlice';
import OverviewContainer from './pages/Overview/OverviewContainer';
import AccountContainer from './pages/Account/AccountContainer';
import SettingContainer from './pages/Setting/SettingContainer';
import TransferContainer from './pages/Transfer/TransferContainer';
import VerifyPIDContainer from './pages/VerifyPID/VerifyPIDContainer';
import Logout from './pages/Logout';
import useCustomerCheck from './utils/useCustomerCheck';
import Loading from '../../common/Loading';
import Transaction from './pages/Transaction';

const checkVerifiedCustomer = {
  check: customer => customer && customer.status !== 'VERIFIED',
  to: '/dashboard/verify',
};

const routes = [
  {
    path: '/dashboard/transfer',
    exact: true,
    main: () => <TransferContainer checkCustomer={checkVerifiedCustomer} />,
  },
  {
    path: '/dashboard/transaction',
    exact: true,
    main: () => <Transaction />,
  },
  {
    path: '/dashboard/overview',
    exact: true,
    main: () => <OverviewContainer checkCustomer={checkVerifiedCustomer} />,
  },
  {
    path: '/dashboard/logout',
    exact: true,
    main: () => <Logout />,
  },
  {
    path: '/dashboard/verify',
    exact: true,
    main: () => <VerifyPIDContainer />,
  },
  {
    path: '/dashboard/account',
    exact: true,
    main: () => <AccountContainer checkCustomer={checkVerifiedCustomer} />,
  },
  {
    path: '/dashboard/settings',
    exact: true,
    main: () => <SettingContainer />,
  },
];

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [{ token, status }] = useCustomerCheck(customer => !customer, '/login');
  const loading = useSelector(state => state.customerAccounts.loading);
  useEffect(() => {
    if (status === 'VERIFIED')
      dispatch(
        fetchAccounts(token, error => {
          console.log(error);
        })
      );
  }, [dispatch, token, status]);

  if (loading) return <Loading />;

  return (
    <Switch>
      {routes.map(r => (
        <Route key={r.path} path={r.path} component={r.main} exact={r.exact} />
      ))}
      <Redirect to="/dashboard/overview" />
    </Switch>
  );
};

export default DashboardContainer;
