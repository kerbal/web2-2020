import React, { useState } from 'react';
import TransferComponent from './TransferComponent';
import withDashboardFrame from '../../withDashboardFrame';

const TransferContainer = () => {
  const [refresh, setRefresh] = useState(false);

  if (refresh) {
    return <div />;
  }

  return (
    <TransferComponent
      refresh={async () => {
        await setRefresh(true);
        await setRefresh(false);
      }}
    />
  );
};

export default withDashboardFrame(TransferContainer);
