import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HomeComponent from './HomeComponent';
import withAdminFrame from '../../withAdminFrame';
import { formatDatetime } from '../../../../../utils';
import { getAllCustomers, searchCustomers } from '../../api/adminCustomer';

let currentPage = 1;

const HomeContainer = ({ history }) => {
  const [customersList, setCustomersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const pageSize = 5;
  const token = useSelector(state => state.adminAuth.token);

  const appendCustomersToList = result => {
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

  const getCustomers = async () => {
    const result = await getAllCustomers(currentPage, pageSize, token);
    appendCustomersToList(result);
  };

  const getCustomersBySearching = async () => {
    const result = await searchCustomers(
      currentPage,
      pageSize,
      token,
      searchString
    );
    appendCustomersToList(result);
  };

  useEffect(() => {
    currentPage = 1;
    getCustomers();
  }, []);

  useEffect(() => {
    if (searchString) {
      setLoading(true);
      currentPage = 1;
      setCustomersList([]);
      getCustomersBySearching(searchString);
    }
  }, [searchString]);

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
    if (searchString) {
      getCustomersBySearching(searchString);
    } else {
      getCustomers();
    }
  };

  const onSearch = string => {
    setSearchString(string);
  };

  return (
    <HomeComponent
      name={name}
      columns={columns}
      data={customersList}
      onClick={onClick}
      onLoadMore={onLoadMore}
      loading={loading}
      onSearch={onSearch}
    />
  );
};

export default withAdminFrame(HomeContainer);
