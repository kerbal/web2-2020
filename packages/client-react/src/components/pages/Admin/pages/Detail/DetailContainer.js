import React from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import DetailComponent from './DetailComponent';
import { checkLoginState } from '../../utils';

const DetailContainer = ({ history }) => {
  if (!checkLoginState()) {
    history.push('/admin/login');
  }
  const location = useLocation();
  const customerId = parseInt(
    new URLSearchParams(location.search).get('cusId'),
    0
  );
  if (!customerId) {
    history.push('/404');
  }
  console.log(customerId);
  const customerDataString = `{
    "id": 1,
    "fullname": "Test customer 1",
    "email": "huynonstop123nt@gmail.com",
    "birthday": "2020-01-01T00:00:00.000Z",
    "phone_number": "111111111",
    "address": "abcdef 111"
  }`;
  const customerData = JSON.parse(customerDataString);
  const customerDetailDataString = `
  {
    "id": 4,
    "fullname": "Nguyen Hoang Thuc",
    "birthday": "1999-12-30T00:00:00.000Z",
    "status": "UNVERIFIED",
    "phone_number": "0962123452",
    "account": [
        {
            "id": 3,
            "customer_id": 4,
            "type": "DEFAULT",
            "account_number": "4000156893210003",
            "balance": 0,
            "currency_unit": "VND",
            "created_date": "2020-07-28T07:18:05.917Z",
            "closed_date": null,
            "status": "NORMAL",
            "createdAt": "2020-07-28T07:18:05.918Z",
            "updatedAt": "2020-07-28T07:18:05.918Z"
        },
        {
            "id": 8,
            "customer_id": 4,
            "type": "DEFAULT",
            "account_number": "4000270623910008",
            "balance": 12000000,
            "currency_unit": "VND",
            "created_date": "2020-07-28T14:43:53.599Z",
            "closed_date": null,
            "status": "NORMAL",
            "createdAt": "2020-07-28T14:43:53.601Z",
            "updatedAt": "2020-07-28T14:43:53.601Z"
        }
    ]
}
  `;
  const customerDetailData = JSON.parse(customerDetailDataString);
  return (
    <DetailComponent
      customerData={customerData}
      customerDetailData={customerDetailData}
    />
  );
};

export default withRouter(DetailContainer);
