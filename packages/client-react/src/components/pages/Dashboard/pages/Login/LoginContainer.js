import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import { signIn } from '../../slice/customerAuthSlice';

const LoginContainer = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const emailValidator = () => {
    return true;
  };

  const passwordValidator = () => {
    return true;
  };

  const onSignIn = useCallback(
    () =>
      dispatch(
        signIn(
          { email, password },
          () => {
            props.history.push('/dashboard');
          },
          error => {
            console.log(error);
          }
        )
      ),
    [dispatch]
  );

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
