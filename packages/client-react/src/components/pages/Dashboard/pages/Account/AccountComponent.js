import React from 'react';

import AccountDetails from './AccountDetails';
import TableView from '../../components/TableView';

const AccountComponent = props => {
  const {
    selectedAccount,
    accounts,
    columns,
    onClickRow,
    onChangeStatus,
  } = props;
  return (
    <>
      <div className="px-4" style={{ flex: '1 1 66.67%', maxWidth: '66.67%' }}>
        <div className="pt-6 font-bold text-xl">Your accounts</div>
        <TableView
          name="all-account-table"
          columns={columns}
          data={accounts}
          onClick={onClickRow}
        />
      </div>
      {selectedAccount ? (
        <AccountDetails
          account={selectedAccount}
          onChangeStatus={onChangeStatus}
        />
      ) : null}
    </>
  );
};

export default AccountComponent;
