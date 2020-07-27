import React from 'react';
import { icons } from '../../../../../assets/';
import { getCurrentDatetime } from '../../../../../utils';

const Logo = () => {
  return (
    <div className="flex items-center flex-shrink-0 text-gray-700 mr-6">
      <img src={icons.logo} width={32} height={'auto'} alt={'logo'}/>
      <span className="font-semibold text-xl tracking-tight ml-2">
        Piggybank
      </span>
    </div>
  );
};

const Header = props => {
  const { title } = props;
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
