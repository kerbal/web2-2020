import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginComponent from './LoginComponent';

const LoginContainer = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailValidator = () => {
    return true;
  };

  const passwordValidator = () => {
    return true;
  };

  const onSignIn = () => {};

  const onRegisterLinkPress = () => {
    props.history.push('/dashboard/register');
  };

  const user = useSelector(state => state.customerAuth.user);
  if (user) {
    props.history.replace('/dashboard');
  }

  return (
    <>
      <LoginComponent
        onRegisterLinkPress={onRegisterLinkPress}
        onSignIn={onSignIn}
        email={email}
        setEmail={setEmail}
        emailValidator={emailValidator}
        password={password}
        setPassword={setPassword}
        passwordValidator={passwordValidator}
      />
    </>
  );
};

export default withRouter(LoginContainer);
