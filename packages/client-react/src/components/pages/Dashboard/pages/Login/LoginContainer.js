import React, { useState } from 'react';
import LoginComponent from './LoginComponent';
import { withRouter } from 'react-router-dom';

const LoginContainer = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailValidator = () => {
    return true;
  }

  const passwordValidator = () => {
    return true;
  }

  const onSignIn = () => { };

  const onRegisterLinkPress = () => {
    props.history.push('/dashboard/register');
  };

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
