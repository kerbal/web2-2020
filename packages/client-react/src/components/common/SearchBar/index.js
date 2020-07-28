import React from 'react';
import { icons } from '../../../assets';

const Container = props => {
  const { children } = props;
  return (
    <div className="flex flex-row p-3 shadow-md bg-white rounded-md">
      {children}
    </div>
  );
};

const Input = props => {
  return (
    <input className=":focus:border-none outline-none flex-1" {...props} />
  );
};

const SearchBar = props => {
  return (
    <Container>
      <img
        alt=""
        width="16"
        height="auto"
        src={icons.searchbar_search}
        style={{ opacity: 0.25, marginRight: '12px' }}
      />
      <Input {...props} />
    </Container>
  );
};

export default SearchBar;
