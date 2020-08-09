import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import HomeContainer from './pages/Home/HomeContainer';
import LoginContainer from './pages/Login/LoginContainer';
import Logout from './pages/Logout';
import DetailContainer from './pages/Detail/DetailContainer';

const AdminContainer = () => {
  const routes = [
    {
      path: '/admin/home',
      exact: true,
      main: () => <HomeContainer />,
    },
    {
      path: '/admin/detail',
      exact: true,
      main: () => <DetailContainer />,
    },
    {
      path: '/admin/login',
      exact: true,
      main: () => <LoginContainer />,
    },
    {
      path: '/admin/logout',
      exact: true,
      main: () => <Logout />,
    },
  ];
  // return <HomeContainer />;
  return (
    <Switch>
      {routes.map(r => {
        return (
          <Route
            key={r.path}
            path={r.path}
            component={r.main}
            exact={r.exact}
          />
        );
      })}
      <Redirect to="/admin/home" />
    </Switch>
  );
};

export default AdminContainer;
