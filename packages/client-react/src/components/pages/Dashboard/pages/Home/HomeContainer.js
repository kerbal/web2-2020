import React from 'react';
import HomeComponent from './HomeComponent';
import withDashboardFrame from '../../withDashboardFrame';

const HomeContainer = () => {
  return <HomeComponent />;
};

export default withDashboardFrame(HomeContainer);
