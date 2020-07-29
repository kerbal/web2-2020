import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import { signIn } from '../../slice/customerAuthSlice';
import { useForm } from '../../../../../utils/hooks';
import { loginFormSetup } from '../../../../../utils/formSetup';
import withProtected from '../../withProtected';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [
    loginForm,
    getLoginData,
    { onFormChange, formValidator, setTouched, checkFormValidity },
  ] = useForm(loginFormSetup);

  const onSignIn = () => {
    setTouched();
    if (checkFormValidity()) {
      dispatch(
        signIn(
          getLoginData(),
          () => {
            history.push('/dashboard');
          },
          error => {
            console.log(error);
          }
        )
      );
    }
  };

  const onRegisterLinkPress = () => {
    history.push('/dashboard/register');
  };

  return (
    <>
      <LoginComponent
        onRegisterLinkPress={onRegisterLinkPress}
        onSignIn={onSignIn}
        onLoginFormChange={onFormChange}
        formValidator={formValidator}
        loginForm={loginForm}
      />
    </>
  );
};

export default withProtected(null, true)(LoginContainer);
