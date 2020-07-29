import React from 'react';
import { Redirect } from 'react-router-dom';
import withProtected from './withProtected';

const DashboardContainer = () => {
  return <Redirect to="dashboard/overview" />;
};

export default withProtected()(DashboardContainer);
