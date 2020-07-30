import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectorAccounts,
  changeStatus,
} from '../../slice/customerAccountSlice';
import { customerSelector } from '../../slice/customerAuthSlice';
import AccountComponent from './AccountComponent';
import withDashboardFrame from '../../withDashboardFrame';

const AccountContainer = () => {
  const dispatch = useDispatch();
  const [columns, accounts] = useSelector(selectorAccounts);
  const [token] = useSelector(customerSelector);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const onClickRow = (e, item) => {
    setSelectedAccount(item);
  };
  const onChangeStatus = () => {
    dispatch(
      changeStatus(token, selectedAccount.id, error => {
        console.log(error);
      })
    );
  };
  return (
    <AccountComponent
      onClickRow={onClickRow}
      columns={columns}
      accounts={accounts}
      selectedAccount={selectedAccount}
      onChangeStatus={onChangeStatus}
    />
  );
};

export default withDashboardFrame(AccountContainer);
