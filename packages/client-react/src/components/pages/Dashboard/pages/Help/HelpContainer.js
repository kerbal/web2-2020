import React from 'react';
import HelpComponent from './HelpComponent';
import withDashboardFrame from '../../withDashboardFrame';

const HelpContainer = () => {
  return <HelpComponent />;
};

export default withDashboardFrame(HelpContainer);
