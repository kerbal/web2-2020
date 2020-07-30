import React from 'react';
import SavingComponent from './SavingComponent';
import withDashboardFrame from '../../withDashboardFrame';
import withProtected from '../../withProtected';

const SavingContainer = () => {
  return <SavingComponent />;
};

export default withProtected()(withDashboardFrame(SavingContainer));
