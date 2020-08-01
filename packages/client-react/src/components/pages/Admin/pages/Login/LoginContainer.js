import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signIn } from '../../slice/adminAuthSlice';
import LoginComponent from './LoginComponent';

const LoginContainer = props => {
  const { history, adminState } = props;
  const { user, loading } = adminState;
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const dispatch = useDispatch();

  if (user) {
    history.push('/admin');
  }

  const composeLoginData = () => {
    const obj = {
      email: emailInput,
      password: passwordInput,
    };
    return JSON.stringify(obj);
  };

  const onSignIn = () => {
    console.log(emailInput, passwordInput, composeLoginData());
    dispatch(signIn(emailInput, passwordInput));
  };
  return (
    <LoginComponent
      emailInput={emailInput}
      setEmailInput={setEmailInput}
      passwordInput={passwordInput}
      setPasswordInput={setPasswordInput}
      onSignIn={onSignIn}
      loading={loading}
    />
  );
};

export default connect(
  state => ({ adminState: state.adminAuth }),
  null
)(withRouter(LoginContainer));
