import React from 'react';
import TransferComponent from './TransferComponent';
import withDashboardFrame from '../../withDashboardFrame';

const TransferContainer = props => {
  return <TransferComponent />;
};

export default withDashboardFrame(TransferContainer);
