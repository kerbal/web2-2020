import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Loading from '../../common/Loading';
import { icons } from '../../../assets';
import { checkLoginState } from './utils';

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
    id: 2,
    name: 'Transfer',
    icon: icons.sidebar_transfer,
    path: '/dashboard/transfer',
  },
  {
    id: 3,
    name: 'Saving Account',
    icon: icons.sidebar_saving,
    path: '/dashboard/savingaccount',
  },
  {
    id: 4,
    name: 'Sub Account',
    icon: icons.sidebar_saving,
    path: '/dashboard/subaccount',
  },
  {
    id: 5,
    name: 'Transactions',
    icon: icons.sidebar_transactions,
    path: '/dashboard/transactions',
  },
  {
    id: 6,
    name: 'Seperator',
  },
  {
    id: 7,
    name: 'Settings',
    icon: icons.sidebar_setting,
    path: '/dashboard/settings',
  },
  {
    id: 8,
    name: 'Help',
    icon: icons.sidebar_help,
    path: '/dashboard/help',
  },
  {
    id: 9,
    name: 'Logout',
    icon: icons.sidebar_logout,
    path: '/dashboard/logout',
  },
];

const withDashboardFrame = ContentComponent => {
  const getCurrentSidebarItem = () => {
    const pathName = window.location.pathname;
    const currentSidebarItem = sidebarItems.find(
      item => item.path === pathName
    );
    if (currentSidebarItem) {
      return currentSidebarItem.name;
    }
    return '';
  };

  // eslint-disable-next-line react/prefer-stateless-function
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
    }

    setLoading(state) {
      this.setState({ loading: state });
    }

    render() {
      const { loading } = this.state;
      const { history } = this.props;

      if (checkLoginState() !== 1) {
        history.push('/');
      }

      return (
        <>
          <Container>
            <Header />
            <ContentContainer>
              <Sidebar
                sidebarItems={sidebarItems}
                currentItem={getCurrentSidebarItem()}
              />
              <ContentComponent setLoading={this.setLoading} />
            </ContentContainer>
          </Container>
          {loading && <Loading />}
        </>
      );
    }
  }

  return withRouter(HOC);
};

export default withDashboardFrame;
