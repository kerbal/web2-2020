import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  confirmDeposit,
  setSelectedAccount,
  createAccount,
  selectorAccounts,
  changeStatus,
  closed,
} from '../../slice/customerAccountSlice';
import { customerSelector } from '../../slice/customerAuthSlice';
import AccountComponent from './AccountComponent';
import withDashboardFrame from '../../withDashboardFrame';

const AccountContainer = () => {
  const dispatch = useDispatch();
  const [columns, accounts] = useSelector(selectorAccounts);
  const [token] = useSelector(customerSelector);
  const selectedAccount = useSelector(
    ({ customerAccounts: { accounts: acs, selectedAccountId } }) =>
      acs.find(a => a.id === selectedAccountId)
  );
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [numberFilter, setNumberFilter] = useState('');
  const onClickRow = (e, item) => {
    dispatch(setSelectedAccount(item.id));
  };
  const onChangeStatus = () => {
    dispatch(
      changeStatus(token, selectedAccount.id, error => {
        console.log(error);
      })
    );
  };
  const onClosedAccount = () => {
    dispatch(
      closed(token, selectedAccount.id, error => {
        console.log(error);
      })
    );
  };
  const onConfirmDeposit = () => {
    dispatch(
      confirmDeposit(token, selectedAccount.id, error => {
        console.log(error);
      })
    );
  };
  const handlerFilter = (value, id) => {
    const handle = {
      'type-filter': setTypeFilter,
      'status-filter': setStatusFilter,
      'number-filter': setNumberFilter,
    };
    handle[id](value);
  };
  const filterAccount = acs => {
    return acs.filter(({ type, status, accountNumber }) => {
      return (
        type.includes(typeFilter.toUpperCase()) &&
        status.includes(statusFilter.toUpperCase()) &&
        accountNumber.includes(numberFilter)
      );
    });
  };
  const onCreateAccount = (type, depositType, cU) => {
    const data = {
      accountType: type,
      currencyUnit: cU,
      depositAccountTypeId: depositType,
    };
    dispatch(
      createAccount(token, data, error => {
        console.log(error);
      })
    );
  };
  return (
    <AccountComponent
      onClickRow={onClickRow}
      columns={columns}
      accounts={filterAccount(accounts)}
      selectedAccount={selectedAccount}
      onChangeStatus={onChangeStatus}
      onClosedAccount={onClosedAccount}
      handlerFilter={handlerFilter}
      typeFilter={typeFilter}
      statusFilter={statusFilter}
      numberFilter={numberFilter}
      onCreateAccount={onCreateAccount}
      onConfirmDeposit={onConfirmDeposit}
    />
  );
};

export default withDashboardFrame(AccountContainer);
