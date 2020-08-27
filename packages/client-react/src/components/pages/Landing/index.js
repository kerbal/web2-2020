import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signIn } from '../Dashboard/slice/customerAuthSlice';
import NavBar from './components/NavBar';
import SplashCarousel from './components/SplashCarousel';
import Introduction from './components/Introduction';
import ProductIntroduction from './components/ProductIntroduction';
import AboutUs from './components/AboutUs';
import useForm from '../../../utils/useForm';
import { loginFormSetup } from '../../../utils/formSetup';
import useError from '../../../utils/useError';

const Landing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [
    loginForm,
    getLoginData,
    { onFormChange, formValidator, setTouched, checkFormValidity },
  ] = useForm(loginFormSetup);
  const loadingLogin = useSelector(state => state.customerAuth.loading);
  const [errorMessage, setError] = useError();
  const onRegisterAccount = () => {
    history.push('/dashboard/register');
  };

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

  return (
    <div>
      <NavBar />
      <SplashCarousel />
      <Introduction
        onSignIn={onSignIn}
        onLoginFormChange={key => e => {
          setError(null);
          onFormChange(key)(e);
        }}
        formValidator={formValidator}
        loginForm={loginForm}
        loadingFrom={loadingLogin}
        errorMessage={errorMessage}
      />
      <ProductIntroduction onRegisterAccount={onRegisterAccount} />
      <AboutUs />
    </div>
  );
};

export default Landing;
