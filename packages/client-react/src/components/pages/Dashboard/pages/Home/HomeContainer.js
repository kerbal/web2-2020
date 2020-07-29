import React from 'react';
import HomeComponent from './HomeComponent';
import withDashboardFrame from '../../withDashboardFrame';
import withProtected from '../../withProtected';

const HomeContainer = () => {
  return <HomeComponent />;
};

export default withProtected()(withDashboardFrame(HomeContainer));
