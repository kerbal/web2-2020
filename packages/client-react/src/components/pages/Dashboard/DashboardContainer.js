import React from 'react';
import { withRouter } from 'react-router-dom';
import VerifyPIDContainer from './pages/VerifyPID/VerifyPIDContainer';
import { checkLoginState } from './utils';

const DashboardContainer = props => {
  const { history } = props;
  const userLoginState = checkLoginState();
  switch (userLoginState) {
    case 1:
      history.push('/dashboard/overview');
      break;
    case 0:
      history.push('/dashboard/login');
      break;
    case -1:
      history.push('/dashboard/verify');
      break;
    default:
      history.push('/dashboard/login');
      break;
  }

  return <></>;
};

export default withRouter(DashboardContainer);
