import React from 'react';
import { useSelector } from 'react-redux';
import { selectorOverviewAccounts } from '../../slice/customerAccountSlice';
import TableView from '../../components/TableView';

const Container = props => {
  const { children } = props;
  return <div className="flex-1 p-6">{children}</div>;
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
    </Container>
  );
};

export default Home;
