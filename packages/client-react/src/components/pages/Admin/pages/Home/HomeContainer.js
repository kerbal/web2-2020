import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HomeComponent from './HomeComponent';
import withAdminFrame from '../../withAdminFrame';
import { formatDatetime } from '../../../../../utils';
import { getAllCustomer } from '../../api/adminCustomer';

let currentPage = 1;

const HomeContainer = ({ history }) => {
  const [customersList, setCustomersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const token = useSelector(state => state.adminAuth.token);

  const getCustomers = async () => {
    const result = await getAllCustomer(currentPage, pageSize, token);
    console.log(result.data);
    if (result && result.data) {
      try {
        const data = result.data.map(item => {
          if (item.birthday) {
            return { ...item, birthday: formatDatetime(item.birthday) };
          }
          return { ...item };
        });
        currentPage += 1;
        setCustomersList(prevCustomersList => [...prevCustomersList, ...data]);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // console.log(token);
    currentPage = 1;
    getCustomers();
  }, []);

  const name = 'admin-customer-table';
  const columns = [
    'Full Name',
    'Email',
    'Day of Birth',
    'Phone Number',
    'Address',
  ];

  const onClick = (e, item) => {
    if (item && item.id) {
      history.replace(`/admin/detail?cusId=${item.id}`);
    }
  };
  const onLoadMore = () => {
    setLoading(true);
    getCustomers();
  };
  console.log(customersList);
  return (
    <HomeComponent
      name={name}
      columns={columns}
      data={customersList}
      onClick={onClick}
      onLoadMore={onLoadMore}
      loading={loading}
    />
  );
};

export default withAdminFrame(HomeContainer);
