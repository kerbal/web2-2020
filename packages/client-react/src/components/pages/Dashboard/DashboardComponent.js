import React, { useState } from 'react';
import LoginContainer from './pages/Login/LoginContainer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Loading from '../../common/Loading';

const Container = props => {
  const { children } = props;
  return <div className="w-screen">{children}</div>;
};

const ContentContainer = props => {
  const { children } = props;
  return <div className="flex flex-row flex-1">{children}</div>;
};

const DashboardContainer = props => {
  const {
    isUserLoggedIn,
    currentCustomerName,
    sidebarItems,
    currentSidebarItem,
    setCurrentSidebarItem,
    contentComponent,
  } = props;
  const ContentComponent = contentComponent;

  const [loading /* setLoading */] = useState(true);

  return (
    <>
      {!isUserLoggedIn ? (
        <LoginContainer />
      ) : (
        <Container>
          <Header title={`Welcome, ${currentCustomerName}`} />
          <ContentContainer>
            <Sidebar
              sidebarItems={sidebarItems}
              currentItem={currentSidebarItem}
              setCurrentSidebarItem={setCurrentSidebarItem}
            />
            <ContentComponent />
          </ContentContainer>
        </Container>
      )}
      {loading && <Loading />}
    </>
  );
};

export default DashboardContainer;
