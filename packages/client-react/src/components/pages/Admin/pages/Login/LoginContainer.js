import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn } from '../../slice/adminAuthSlice';
import LoginComponent from './LoginComponent';
import useError from '../../../../../utils/useError';

const LoginContainer = props => {
  const { history, adminState } = props;
  const { user, loading } = adminState;
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const dispatch = useDispatch();
  const [errorMessage, setError] = useError();
  if (user) {
    history.push('/admin');
  }

  const onSignIn = () => {
    dispatch(signIn(emailInput, passwordInput, setError));
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      if (emailInput && passwordInput) {
        onSignIn();
      }
    }
  }
  return (
    <LoginComponent
      emailInput={emailInput}
      setEmailInput={setEmailInput}
      passwordInput={passwordInput}
      setPasswordInput={setPasswordInput}
      onSignIn={onSignIn}
      loading={loading}
      onEnter={onEnter}
      errorMessage={errorMessage}
    />
  );
};

export default connect(
  state => ({ adminState: state.adminAuth }),
  null
)(withRouter(LoginContainer));
