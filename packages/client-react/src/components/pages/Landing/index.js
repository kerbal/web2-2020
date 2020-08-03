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

const Landing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [
    loginForm,
    getLoginData,
    { onFormChange, formValidator, setTouched, checkFormValidity },
  ] = useForm(loginFormSetup);
  const loadingLogin = useSelector(state => state.customerAuth.loading);

  const onRegisterAccount = () => {
    history.push('/dashboard/register');
  };

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

  return (
    <div>
      <NavBar />
      <SplashCarousel />
      <Introduction
        onSignIn={onSignIn}
        onLoginFormChange={onFormChange}
        formValidator={formValidator}
        loginForm={loginForm}
        loadingFrom={loadingLogin}
      />
      <ProductIntroduction onRegisterAccount={onRegisterAccount} />
      <AboutUs />
    </div>
  );
};

export default Landing;
