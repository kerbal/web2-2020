import React from 'react';
import SavingComponent from './SavingComponent';
import withDashboardFrame from '../../withDashboardFrame';

const SavingContainer = () => {
  return <SavingComponent />;
};

export default withDashboardFrame(SavingContainer);
