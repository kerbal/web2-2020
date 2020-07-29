import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { customerSelector } from '../slice/customerAuthSlice';

export default (checkCustomer, to) => {
  const history = useHistory();
  const customer = useSelector(customerSelector);
  useEffect(() => {
    if (checkCustomer(customer)) {
      history.replace(to);
    }
  }, []);
};
