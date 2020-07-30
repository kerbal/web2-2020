import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../slice/customerAuthSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(signOut());
    history.replace('/');
  }, []);

  return <div />;
};

export default Logout;
