import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import { signIn } from '../../slice/customerAuthSlice';
import { useLoginForm } from '../../../../../utils/hooks';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [
    loginForm,
    loginData,
    onLoginFormChange,
    formValidator,
  ] = useLoginForm();

  const onSignIn = () =>
    dispatch(
      signIn(
        loginData,
        () => {
          history.push('/dashboard');
        },
        error => {
          console.log(error);
        }
      )
    );

  const onRegisterLinkPress = () => {
    history.push('/dashboard/register');
  };

  return (
    <>
      <LoginComponent
        onRegisterLinkPress={onRegisterLinkPress}
        onSignIn={onSignIn}
        onLoginFormChange={onLoginFormChange}
        formValidator={formValidator}
        loginForm={loginForm}
      />
    </>
  );
};

export default LoginContainer;
