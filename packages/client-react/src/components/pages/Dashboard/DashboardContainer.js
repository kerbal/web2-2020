import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import OverviewContainer from './pages/Overview/OverviewContainer';
import AccountContainer from './pages/Account/AccountContainer';
import TransferContainer from './pages/Transfer/TransferContainer';
import VerifyPIDContainer from './pages/VerifyPID/VerifyPIDContainer';
import Logout from './pages/Logout';
import useCustomerCheck from './utils/useCustomerCheck';

const checkVerifiedCustomer = {
  status: 'VERIFIED',
  to: '/dashboard/verify',
};

const routes = [
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
    path: '/dashboard/overview',
    exact: true,
    main: () => <OverviewContainer checkCustomer={checkVerifiedCustomer} />,
  },
  {
    path: '/dashboard/account',
    exact: true,
    main: () => <AccountContainer checkCustomer={checkVerifiedCustomer} />,
  },
  {
    path: '/dashboard/transfer',
    exact: true,
    main: () => <TransferContainer checkCustomer={checkVerifiedCustomer} />,
  },
];

const DashboardContainer = () => {
  useCustomerCheck(customer => !customer, '/login');

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
