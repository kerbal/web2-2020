import React from 'react';
import HelpComponent from './HelpComponent';
import { withRouter } from 'react-router-dom';
import { checkUserHasLoggedIn } from '../../utils';

const HelpContainer = (props) => {
  let isUserLoggedIn = checkUserHasLoggedIn();
  if (!isUserLoggedIn) {
    props.history.replace('/dashboard/login')
  }
  return (
    <HelpComponent />
  )
}

export default withRouter(HelpContainer);
