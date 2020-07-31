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
  } = props;
  return (
    <>
      <div
        className="pt-6 px-4"
        style={{ flex: '1 1 66.67%', maxWidth: '66.67%' }}
      >
        <div className="pb-2 font-bold text-xl">Create new accounts</div>
        <div className="flex">
          <AccountNew onConfirm={onCreateAccount}/>
        </div>
        <div className="pb-2 font-bold text-xl">Your accounts</div>
        <div className="flex">
          <div
            className="px-2"
            style={{ flex: '1 1 33.33%', maxWidth: '33.33%' }}
          >
            <Input
              label="Type"
              id="type-filter"
              value={typeFilter}
              onValueChange={text => handlerFilter(text, 'type-filter')}
            ></Input>
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
            ></Input>
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
            ></Input>
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
        />
      ) : null}
    </>
  );
};

export default AccountComponent;
