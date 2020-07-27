import React from 'react';
import { icons } from '../../../../../assets';

const Logo = () => {
  return (
    <div className="flex items-center flex-shrink-0 text-gray-700 mr-6">
      <img src={icons.logo} width={32} height="auto" alt="logo" />
      <span className="font-semibold text-xl tracking-tight ml-2">
        Piggybank
      </span>
    </div>
  );
};

const MenuButton = () => {
  return (
    <div className="block lg:hidden">
      <button
        type="button"
        className="flex items-center px-3 py-2 border rounded text-gray-500 border-teal-400 hover:text-gray-700 hover:border-gray-700"
      >
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
  );
};

const NavItems = props => {
  const { navItems } = props;
  return (
    <div className="text-sm lg:flex-grow">
      {navItems.map(item => {
        return (
          <a
            href={item.link}
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-gray-700 mr-4"
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
};

const InternetBankingButton = () => {
  return (
    <div>
      <a
        href="/dashboard"
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-gray-700 hover:border-transparent hover:text-teal-500 hover:bg-gray-700 mt-4 lg:mt-0"
      >
        Internet Banking
      </a>
    </div>
  );
};

const NavBar = () => {
  const navItems = [
    {
      link: '',
      label: 'Home',
    },
    {
      link: '#personal-account',
      label: 'Personal Account',
    },
    {
      link: '#saving-account',
      label: 'Saving Account',
    },
    {
      link: '#about-us',
      label: 'About Us',
    },
  ];
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6">
      <Logo />
      <MenuButton />
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:justify-between">
        <NavItems navItems={navItems} />
        <InternetBankingButton />
      </div>
    </nav>
  );
};

export default NavBar;
