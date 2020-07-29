import React from 'react';
import TransferComponent from './TransferComponent';
import withDashboardFrame from '../../withDashboardFrame';
import withProtected from '../../withProtected';

const TransferContainer = () => {
  return <TransferComponent />;
};

export default withProtected()(withDashboardFrame(TransferContainer));
