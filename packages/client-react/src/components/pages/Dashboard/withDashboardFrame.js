import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Loading from '../../common/Loading';
import { icons } from '../../../assets';
import useCustomerCheck from './utils/useCustomerCheck';

const Container = props => {
  const { children } = props;
  return <div className="w-screen">{children}</div>;
};

const ContentContainer = props => {
  const { children } = props;
  return <div className="flex flex-row flex-1">{children}</div>;
};

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
      useCustomerCheck(
        c => c.status !== checkCustomer?.status,
        checkCustomer?.to
      );
    const [loading, setLoading] = useState(false);
    return (
      <>
        <Container>
          <Header />
          <ContentContainer>
            <Sidebar sidebarItems={sidebarItems} />
            <ContentComponent setLoading={setLoading} />
          </ContentContainer>
        </Container>
        {loading && <Loading />}
      </>
    );
  };
};

export default withDashboardFrame;
