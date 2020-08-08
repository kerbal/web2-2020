import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DetailComponent from './DetailComponent';
import { checkLoginState } from '../../utils';
import {
  getCustomerById,
  getCustomerDetailById,
} from '../../api/adminCustomer';

const DetailContainer = ({ history }) => {
  const [customerData, setCustomerData] = useState({});
  const [customerDetailData, setCustomerDetailData] = useState({});
  const [loading, setLoading] = useState(true);

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

  const token = useSelector(state => state.adminAuth.token);

  const getCustomer = async () => {
    const result = await getCustomerById(customerId, token);
    if (result && result.data) {
      setCustomerData(result.data);
    }
  };

  const getCustomerDetail = async () => {
    const result = await getCustomerDetailById(customerId, token);
    if (result && result.data) {
      setCustomerDetailData(result.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomer();
    getCustomerDetail();
  }, []);

  return (
    <DetailComponent
      customerData={customerData}
      customerDetailData={customerDetailData}
      loading={loading}
    />
  );
};

export default withRouter(DetailContainer);
