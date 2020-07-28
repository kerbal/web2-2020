import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { icons } from '../../../assets';

export default memo(() => {
  return (
    <Link to="/">
      <div className="flex items-center flex-shrink-0 text-gray-700 mr-6">
        <img src={icons.logo} width={32} height="auto" alt="logo" />
        <span className="font-semibold text-xl tracking-tight ml-2">
          PiggyBank
        </span>
      </div>
    </Link>
  );
});
