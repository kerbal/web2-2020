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
  }, [history, dispatch]);

  return <div />;
};

export default Logout;
