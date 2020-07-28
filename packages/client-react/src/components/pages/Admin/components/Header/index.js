import React from 'react';
import Logo from '../../../../common/Logo';

const Header = props => {
  const { pageTitle } = props;
  return (
    <nav className="flex items-center flex-wrap bg-white p-6">
      <div style={{ width: '250px' }}>
        <Logo />
      </div>
      <div className="flex flex-row justify-between flex-1">
        <div className="font-thin text-2xl">{pageTitle}</div>
        <div className="">Log out</div>
      </div>
    </nav>
  );
};

export default Header;
