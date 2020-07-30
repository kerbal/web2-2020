import React from 'react';
import HelpComponent from './HelpComponent';
import withDashboardFrame from '../../withDashboardFrame';
import withProtected from '../../withProtected';

const HelpContainer = () => {
  return <HelpComponent />;
};

export default withProtected()(withDashboardFrame(HelpContainer));
