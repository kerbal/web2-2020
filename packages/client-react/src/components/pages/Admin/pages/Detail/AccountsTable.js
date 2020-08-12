import React from 'react';
import TableView from '../../../../common/TableView';
import { formatCurrency } from '../../../../../utils';

const AccountsTable = props => {
  const {
    data = [],
    setselectedAccountToViewTrans,
    setIsTransactionModalShown,
  } = props;
  const name = 'dashboard-transaction-table';
  const columns = ['Account Number', 'Balance', 'Currency Unit', 'Account Type', 'Status'];

  const formattedData = data.map(item => {
    if (item) {
      return {
        id: item.id,
        accountNumber: item.account_number,
        balance: formatCurrency(item.balance),
        currencyUnit: item.currency_unit,
        accountType: item.type,
        status: item.status,
      };
    }
    return {};
  });
  const onClick = (e, item) => {
    setselectedAccountToViewTrans(item);
    setIsTransactionModalShown(true);
  };

  return (
    <TableView
      name={name}
      columns={columns}
      data={formattedData}
      onClick={onClick}
    />
  );
};

export default AccountsTable;