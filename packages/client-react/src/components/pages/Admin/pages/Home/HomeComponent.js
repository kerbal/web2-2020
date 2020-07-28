import React, { useState } from 'react';
import SearchBar from '../../../../common/SearchBar';
import TableView from '../../../../common/TableView';
import FunctionButton from '../../../../common/FunctionButton';
import Header from '../../components/Header';

const ContentContainer = props => {
  const { children } = props;
  return <div className="flex flex-col p-6 w-screen">{children}</div>;
};

const ToolbarContainer = props => {
  const { children } = props;
  return (
    <div className="flex justify-between items-center mb-3">{children}</div>
  );
};

const SearchbarContainer = props => {
  const { children } = props;
  return <div className="w-1/2">{children}</div>;
};

const TooltipContainer = props => {
  const { children } = props;
  return <div className="font-light italic">{children}</div>;
};

const TableViewContainer = props => {
  const { children } = props;
  return <div className="pt-6">{children}</div>;
};

const LoadMoreBtnContainer = props => {
  const { children } = props;
  return <div className="pt-6 w-1/4 self-center">{children}</div>;
};

const HomeComponent = () => {
  const name = 'admin-customer-table';
  const columns = [
    'Full Name',
    'Email',
    'Day of Birth',
    'Phone Number',
    'Address',
  ];
  const dataString = `[
    {
      "id": 1,
      "fullname": "Test customer 1",
      "email": "huynonstop123nt@gmail.com",
      "birthday": "2020-01-01T00:00:00.000Z",
      "phone_number": "111111111",
      "address": "abcdef 111"
    },
    {
      "id": 2,
      "fullname": "Test customer 2",
      "email": "tthuykh99@gmail.com",
      "birthday": "2020-02-02T00:00:00.000Z",
      "phone_number": "222222222",
      "address": "abcdef 222"
    },
    {
      "id": 4,
      "fullname": "Nguyen Hoang Thuc",
      "email": "test123@gmail.com",
      "birthday": "1999-12-30T00:00:00.000Z",
      "phone_number": "0962123452",
      "address": "TP.HCM"
    }
  ]`;
  const data = JSON.parse(dataString);
  const onClick = () => {
    console.log('clicked');
  };

  return (
    <>
      <Header pageTitle="Admin Portal" />
      <ContentContainer>
        <ToolbarContainer>
          <SearchbarContainer>
            <SearchBar placeholder="Search customer username or email" />
          </SearchbarContainer>
          <TooltipContainer>
            Double tap on a customer to view more details
          </TooltipContainer>
        </ToolbarContainer>
        <TableViewContainer>
          <TableView
            name={name}
            columns={columns}
            data={data}
            onClick={onClick}
          />
        </TableViewContainer>
        <LoadMoreBtnContainer>
          <FunctionButton label="Load More" />
        </LoadMoreBtnContainer>
      </ContentContainer>
    </>
  );
};

export default HomeComponent;
