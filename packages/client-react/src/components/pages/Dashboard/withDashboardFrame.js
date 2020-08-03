import React from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Loading from '../../common/Loading';
import { icons } from '../../../assets';
import useCustomerCheck from './utils/useCustomerCheck';

const sidebarItems = [
  {
    id: 1,
    name: 'Overview',
    icon: icons.sidebar_dashboard,
    path: '/dashboard/overview',
  },
  {
    id: 3,
    name: 'Account',
    icon: icons.sidebar_saving,
    path: '/dashboard/account',
  },
  {
    id: 2,
    name: 'Transfer',
    icon: icons.sidebar_transfer,
    path: '/dashboard/transfer',
  },
  {
    id: 20,
    name: 'Transaction',
    icon: icons.sidebar_transactions,
    path: '/dashboard/transaction',
  },
  {
    id: 6,
    name: 'Separator',
  },
  {
    id: 7,
    name: 'Settings',
    icon: icons.sidebar_setting,
    path: '/dashboard/settings',
  },
  {
    id: 9,
    name: 'Logout',
    icon: icons.sidebar_logout,
    path: '/dashboard/logout',
  },
];

const withDashboardFrame = ContentComponent => {
  return ({ checkCustomer }) => {
    if (checkCustomer)
      useCustomerCheck(checkCustomer?.check, checkCustomer?.to);
    const loading = useSelector(state => state.customerAccounts.loading);
    return (
      <>
        <div className="mx-auto" style={{ maxWidth: '1600px' }}>
          <Header />
          <div className="flex flex-row flex-1 p-6">
            <Sidebar sidebarItems={sidebarItems} />
            <ContentComponent />
          </div>
          {loading && <Loading />}
        </div>
      </>
    );
  };
};

export default withDashboardFrame;
