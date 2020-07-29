import React from 'react';
import SavingComponent from './AccountComponent';
import withDashboardFrame from '../../withDashboardFrame';

const SavingContainer = () => {
  return <SavingComponent />;
};

export default withDashboardFrame(SavingContainer);
