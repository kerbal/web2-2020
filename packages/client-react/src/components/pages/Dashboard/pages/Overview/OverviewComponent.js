import React from 'react';
import { useSelector } from 'react-redux';
import { selectorOverviewAccounts } from '../../slice/customerAccountSlice';
import { formatCurrency, formatDatetime } from '../../../../../utils';
import TableView from '../../components/TableView';

const Container = props => {
  const { children } = props;
  return <div className="flex-1 p-6">{children}</div>;
};

const TransactionsTable = () => {
  const name = 'dashboard-transaction-table';
  const columns = [
    'Date',
    'Destination Account Name',
    'Destination Account Number',
    'Amount',
    'Status',
  ];
  const data = [
    {
      id: 2,
      createdAt: formatDatetime('2020-07-23T03:52:45.370Z'),
      destinationAccountName: 'Test customer 1',
      destinationAccountNumber: '1111111111111111',
      amount: `-${formatCurrency('100000')}`,
      status: 'UNVERIFIED',
    },
    {
      id: 3,
      createdAt: formatDatetime('2020-07-23T03:52:45.370Z'),
      destinationAccountName: 'Test customer 1',
      destinationAccountNumber: '1111111111111111',
      amount: `-${formatCurrency('100000')}`,
      status: 'UNVERIFIED',
    },
  ];
  const onClick = () => {
    console.log('clicked');
  };

  return (
    <TableView name={name} columns={columns} data={data} onClick={onClick} />
  );
};

const AccountsTable = () => {
  const name = 'dashboard-account-table';
  const [columns, data] = useSelector(selectorOverviewAccounts);

  return <TableView name={name} columns={columns} data={data} />;
};

const Home = () => {
  return (
    <Container>
      <div className="pb-6 font-bold text-xl">Accounts</div>
      <AccountsTable />
      <div className="py-6 font-bold text-xl">Recent Transactions</div>
      <TransactionsTable />
    </Container>
  );
};

export default Home;
