import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import withProtected from './withProtected';
import HomeContainer from './pages/Home/HomeContainer';
import SavingContainer from './pages/Saving/SavingContainer';
import TransferContainer from './pages/Transfer/TransferContainer';
import HelpContainer from './pages/Help/HelpContainer';
import VerifyPIDContainer from './pages/VerifyPID/VerifyPIDContainer';
import Logout from './pages/Logout';

const DashboardContainer = ({ customer }) => {
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
      main: () => <HomeContainer />,
    },
    {
      path: '/dashboard/savingaccount',
      exact: true,
      main: () => <SavingContainer />,
    },
    {
      path: '/dashboard/transfer',
      exact: true,
      main: () => <TransferContainer />,
    },
    {
      path: '/dashboard/help',
      exact: true,
      main: () => <HelpContainer />,
    },
  ];

  if (!customer) {
    return <Redirect to="/login" />;
  }

  return (
    <Switch>
      {routes.map(r => (
        <Route key={r.path} path={r.path} component={r.main} exact={r.exact} />
      ))}
      <Redirect to="/dashboard/overview" />
    </Switch>
  );
};

export default connect(state => ({
  customer: state.customerAuth.user,
}))(DashboardContainer);
