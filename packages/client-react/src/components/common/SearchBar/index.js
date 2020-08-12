import React from 'react';
import { useForm } from 'react-hook-form';
import { icons } from '../../../assets';

const Container = props => {
  const { children } = props;
  return (
    <div className="flex flex-row p-3 shadow-md bg-white rounded-md">
      {children}
    </div>
  );
};

const SearchBar = props => {
  const { onSearch } = props;
  const { register, handleSubmit } = useForm();
  const inputRef = register();

  const onSubmit = data => {
    console.log('aaaaaaa');
    if (data && data.searchinput) {
      if (onSearch) onSearch(data.searchinput);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <img
          alt=""
          width="16"
          height="auto"
          src={icons.searchbar_search}
          style={{ opacity: 0.25, marginRight: '12px' }}
        />
        <input
          ref={inputRef}
          name="searchinput"
          className=":focus:border-none outline-none flex-1"
          {...props}
        />
      </Container>
    </form>
  );
};

export default SearchBar;
