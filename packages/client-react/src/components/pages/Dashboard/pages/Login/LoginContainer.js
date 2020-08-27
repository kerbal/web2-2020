import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import { signIn } from '../../slice/customerAuthSlice';
import useForm from '../../../../../utils/useForm';
import useError from '../../../../../utils/useError';
import { loginFormSetup } from '../../../../../utils/formSetup';
import useCustomerCheck from '../../utils/useCustomerCheck';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [
    loginForm,
    getLoginData,
    { onFormChange, formValidator, setTouched, checkFormValidity },
  ] = useForm(loginFormSetup);
  const loadingLogin = useSelector(state => state.customerAuth.loading);
  const [errorMessage, setError] = useError();
  const onSignIn = e => {
    e.preventDefault();
    setTouched();
    setError(null);
    if (checkFormValidity()) {
      dispatch(
        signIn(
          getLoginData(),
          () => {
            history.push('/dashboard');
          },
          error => {
            setError(error.response.data.error);
          }
        )
      );
    }
  };

  useCustomerCheck(customer => customer, '/dashboard/overview');

  return (
    <>
      <LoginComponent
        onSignIn={onSignIn}
        onLoginFormChange={key => e => {
          setError(null);
          onFormChange(key)(e);
        }}
        formValidator={formValidator}
        loginForm={loginForm}
        loadingForm={loadingLogin}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default LoginContainer;
