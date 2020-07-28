import React from 'react';
import { getCurrentDatetime } from '../../../../../utils';
import Logo from '../../../../common/Logo';

const Header = ({ title }) => {
  return (
    <nav className="flex items-center flex-wrap bg-white p-6">
      <div style={{ width: '250px' }}>
        <Logo />
      </div>
      <div className="flex flex-row justify-between flex-1">
        <div className="font-thin text-2xl">{title}</div>
        <div className="font-normal text-xl">{`Today is ${getCurrentDatetime()}`}</div>
      </div>
    </nav>
  );
};

export default Header;
