import React from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../../../../common/Logo';

const Header = props => {
  const { pageTitle, history } = props;
  return (
    <nav className="flex items-center flex-wrap bg-white p-6">
      <div style={{ width: '250px' }}>
        <Logo />
      </div>
      <div className="flex flex-row justify-between flex-1">
        <div className="font-thin text-2xl">{pageTitle}</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            history.push('/admin/logout');
          }}
        >
          Log out
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
