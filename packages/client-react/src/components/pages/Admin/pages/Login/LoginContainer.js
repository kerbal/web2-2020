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
    dispatch(signIn(emailInput, passwordInput));
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
    />
  );
};

export default connect(
  state => ({ adminState: state.adminAuth }),
  null
)(withRouter(LoginContainer));
