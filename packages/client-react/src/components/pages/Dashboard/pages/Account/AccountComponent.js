import React from 'react';

import AccountNew from './AccountNew';
import AccountDetails from './AccountDetails';
import TableView from '../../components/TableView';
import Input from '../../../../common/Input';

const AccountComponent = props => {
  const {
    selectedAccount,
    accounts,
    columns,
    onClickRow,
    onChangeStatus,
    onClosedAccount,
    handlerFilter,
    typeFilter,
    statusFilter,
    numberFilter,
    onCreateAccount,
    onConfirmDeposit,
  } = props;
  return (
    <>
      <div className="pt-6 px-4 flex-1">
        <div className="pb-4 font-bold text-4xl">Your accounts</div>
        <AccountNew onConfirm={onCreateAccount} />
        <div
          className="px-2 pb-2 font-bold text-xl"
          style={{ flex: '1 1 100%', maxWidth: '100%' }}
        >
          Search
        </div>
        <div className="flex pl-4">
          <div
            className="px-2"
            style={{ flex: '1 1 33.33%', maxWidth: '33.33%' }}
          >
            <Input
              label="Type"
              id="type-filter"
              value={typeFilter}
              onValueChange={text => handlerFilter(text, 'type-filter')}
            />
          </div>
          <div
            className="px-2"
            style={{ flex: '1 1 33.33%', maxWidth: '33.33%' }}
          >
            <Input
              label="Account Number"
              id="number-filter"
              value={numberFilter}
              onValueChange={text => handlerFilter(text, 'number-filter')}
            />
          </div>
          <div
            className="px-2"
            style={{ flex: '1 1 33.33%', maxWidth: '33.33%' }}
          >
            <Input
              label="Status"
              id="status-filter"
              value={statusFilter}
              onValueChange={text => handlerFilter(text, 'status-filter')}
            />
          </div>
        </div>
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
          onClosed={onClosedAccount}
          onConfirmDeposit={onConfirmDeposit}
        />
      ) : null}
    </>
  );
};

export default AccountComponent;
