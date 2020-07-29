import React from 'react';
import Landing from './components/pages/Landing';
import DashboardContainer from './components/pages/Dashboard/DashboardContainer';
import LoginContainer from './components/pages/Dashboard/pages/Login/LoginContainer';
import RegisterContainer from './components/pages/Dashboard/pages/Register/RegisterContainer';
import Admin from './components/pages/Admin';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Landing />,
  },
  {
    path: '/dashboard',
    exact: false,
    main: () => <DashboardContainer />,
  },
  {
    path: '/login',
    exact: true,
    main: () => <LoginContainer />,
  },
  {
    path: '/register',
    exact: true,
    main: () => <RegisterContainer />,
  },
  // {
  //   path: '/dashboard/logout',
  //   exact: true,
  //   main: () => <Logout />,
  // },
  // {
  //   path: '/dashboard/verify',
  //   exact: true,
  //   main: () => <VerifyPIDContainer />,
  // },
  // {
  //   path: '/dashboard/overview',
  //   exact: true,
  //   main: () => <HomeContainer />,
  // },
  // {
  //   path: '/dashboard/savingaccount',
  //   exact: true,
  //   main: () => <SavingContainer />,
  // },
  // {
  //   path: '/dashboard/transfer',
  //   exact: true,
  //   main: () => <TransferContainer />,
  // },
  // {
  //   path: '/dashboard/help',
  //   exact: true,
  //   main: () => <HelpContainer />,
  // },
  {
    path: '/admin',
    exact: true,
    main: () => <Admin />,
  },
];

export default routes;
