import React, { useState } from 'react';
import DashboardComponent from './DashboardComponent';
import {
  checkUserHasLoggedIn,
  getCurrentUserName,
  getDefaultPage,
} from './utils';
import { icons } from '../../../assets';
import HomeContainer from './pages/Home/HomeContainer';
import TransferContainer from './pages/Transfer/TransferContainer';
import SavingContainer from './pages/Saving/SavingContainer';

const DashboardContainer = () => {
  const isUserLoggedIn = checkUserHasLoggedIn();
  const currentCustomerName = getCurrentUserName();

  const [currentSidebarItem, setCurrentSidebarItem] = useState(
    getDefaultPage()
  );
  const sidebarItems = [
    {
      id: 1,
      name: 'Overview',
      icon: icons.sidebar_dashboard,
      render: HomeContainer,
    },
    {
      id: 2,
      name: 'Transfer',
      icon: icons.sidebar_transfer,
      render: TransferContainer,
    },
    {
      id: 3,
      name: 'Saving',
      icon: icons.sidebar_saving,
      render: SavingContainer,
    },
    {
      id: 4,
      name: 'Transactions',
      icon: icons.sidebar_transactions,
      render: TransferContainer,
    },
    {
      id: 5,
      name: 'Seperator',
    },
    {
      id: 6,
      name: 'Settings',
      icon: icons.sidebar_setting,
      render: TransferContainer,
    },
    {
      id: 7,
      name: 'Help',
      icon: icons.sidebar_help,
      render: TransferContainer,
    },
    {
      id: 8,
      name: 'Logout',
      icon: icons.sidebar_logout,
      render: TransferContainer,
    },
  ];

  const contentComponent = sidebarItems.find(
    item => item.name === currentSidebarItem
  )?.render || <div />;

  return (
    <DashboardComponent
      isUserLoggedIn={isUserLoggedIn}
      currentCustomerName={currentCustomerName}
      currentSidebarItem={currentSidebarItem}
      setCurrentSidebarItem={setCurrentSidebarItem}
      sidebarItems={sidebarItems}
      contentComponent={contentComponent}
    />
  );
};

export default DashboardContainer;
