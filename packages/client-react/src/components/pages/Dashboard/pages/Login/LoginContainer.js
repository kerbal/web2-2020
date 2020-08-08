import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import { signIn } from '../../slice/customerAuthSlice';
import useForm from '../../../../../utils/useForm';
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

  const onSignIn = e => {
    e.preventDefault();
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

  useCustomerCheck(customer => customer, '/dashboard/overview');

  return (
    <>
      <LoginComponent
        onSignIn={onSignIn}
        onLoginFormChange={onFormChange}
        formValidator={formValidator}
        loginForm={loginForm}
        loadingForm={loadingLogin}
      />
    </>
  );
};

export default LoginContainer;
