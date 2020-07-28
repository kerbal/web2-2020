import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signIn } from '../Dashboard/slice/customerAuthSlice';
import NavBar from './components/NavBar';
import SplashCarousel from './components/SplashCarousel';
import Introduction from './components/Introduction';
import ProductIntroduction from './components/ProductIntroduction';
import AboutUs from './components/AboutUs';
import { useLoginForm } from '../../../utils/hooks';

const Landing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [
    loginForm,
    loginData,
    onLoginFormChange,
    formValidator,
  ] = useLoginForm();

  const onRegisterAccount = () => {
    history.push('/dashboard/register');
  };

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

  return (
    <div>
      <NavBar />
      <SplashCarousel />
      <Introduction
        onSignIn={onSignIn}
        onLoginFormChange={onLoginFormChange}
        formValidator={formValidator}
        loginForm={loginForm}
      />
      <ProductIntroduction onRegisterAccount={onRegisterAccount} />
      <AboutUs />
    </div>
  );
};

export default Landing;
