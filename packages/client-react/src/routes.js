import React from 'react';
import Landing from './components/pages/Landing';

import DashboardContainer from './components/pages/Dashboard/DashboardContainer';
import LoginContainer from './components/pages/Dashboard/pages/Login/LoginContainer';
import VerifyPIDContainer from './components/pages/Dashboard/pages/VerifyPID/VerifyPIDContainer';
import RegisterContainer from './components/pages/Dashboard/pages/Register/RegisterContainer';
import HomeContainer from './components/pages/Dashboard/pages/Home/HomeContainer';
import SavingContainer from './components/pages/Dashboard/pages/Saving/SavingContainer';
import TransferContainer from './components/pages/Dashboard/pages/Transfer/TransferContainer';
import HelpContainer from './components/pages/Dashboard/pages/Help/HelpContainer';

import Admin from './components/pages/Admin';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Landing />,
  },
  {
    path: '/dashboard',
    exact: true,
    main: () => <DashboardContainer />,
  },
  {
    path: '/dashboard/login',
    exact: true,
    main: () => <LoginContainer />,
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
    path: '/dashboard/register',
    exact: true,
    main: () => <RegisterContainer />,
  },
  {
    path: '/dashboard/help',
    exact: true,
    main: () => <HelpContainer />,
  },
  {
    path: '/admin',
    exact: true,
    main: () => <Admin />,
  },
];

export default routes;
