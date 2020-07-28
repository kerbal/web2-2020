import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentDatetime } from '../../../../../utils';
import Logo from '../../../../common/Logo';

const Header = () => {
  const user = useSelector(state => state.customerAuth.user) || { email: ''};
  return (
    <nav className="flex items-center flex-wrap bg-white p-6">
      <div style={{ width: '250px' }}>
        <Logo />
      </div>
      <div className="flex flex-row justify-between flex-1">
        <div className="font-thin text-2xl">{`Welcome, ${user.email}`}</div>
        <div className="font-normal text-xl">{`Today is ${getCurrentDatetime()}`}</div>
      </div>
    </nav>
  );
};

export default Header;
