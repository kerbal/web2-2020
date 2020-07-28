import React from 'react';
import HomeComponent from './HomeComponent';
import withAdminFrame from '../../withAdminFrame';

const HomeContainer = () => {
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
    <HomeComponent
      name={name}
      columns={columns}
      data={data}
      onClick={onClick}
    />
  );
};

export default withAdminFrame(HomeContainer);
