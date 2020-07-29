import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../../common/Logo';

const MenuButton = () => {
  return (
    <div className="block md:hidden">
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
    <div className="text-sm md:flex-grow">
      {navItems.map(item => {
        return (
          <a
            href={item.link}
            className="block text-center mt-4 md:inline-block md:mt-0 text-gray-500 hover:text-gray-700 md:mr-4"
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
    <div className="text-center mt-4 md:mt-0">
      <Link
        to="/dashboard"
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-gray-700 hover:border-transparent hover:text-teal-500 hover:bg-gray-700"
      >
        Internet Banking
      </Link>
    </div>
  );
};

const NavBar = () => {
  const navItems = [
    {
      link: '#',
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
    <div className="bg-white">
      <nav className="container mx-auto flex items-center justify-between flex-wrap p-6">
        <Logo />
        <MenuButton />
        <div className="w-full block flex-grow md:flex md:items-center md:w-auto md:justify-between">
          <NavItems navItems={navItems} />
          <InternetBankingButton />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
