import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../slice/adminAuthSlice';

const Logout = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
    history.replace('/admin');
  }, []);
  return <div className="p-6">Logging out </div>;
};

export default withRouter(Logout);
