import React, { useState } from 'react';
import TransferComponent from './TransferComponent';
import withDashboardFrame from '../../withDashboardFrame';

const TransferContainer = () => {
  const [refresh, setRefresh] = useState(false);

  if (refresh) {
    return <div />;
  }

  return (
    <div className="w-full">
      <TransferComponent
        refresh={async () => {
          console.log('ble');
          await setRefresh(true);
          await setRefresh(false);
        }}
      />
    </div>
  );
};

export default withDashboardFrame(TransferContainer);
