import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signIn } from './slice/customerAuthSlice';
import NavBar from './components/NavBar';
import SplashCarousel from './components/SplashCarousel';
import Introduction from './components/Introduction';
import ProductIntroduction from './components/ProductIntroduction';
import AboutUs from './components/AboutUs';

const Landing = props => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const onLoginFormChange = field => {
    return value => {
      const newLoginForm = {
        ...loginForm,
        [field]: value,
      };
      setLoginForm(newLoginForm);
    };
  };

  const onRegisterAccount = () => {
    props.history.push('/dashboard/register');
  };

  const onSignIn = () => {
    dispatch(
      signIn(
        loginForm,
        () => {
          props.history.push('/dashboard');
        },
        error => {
          console.log(error);
        }
      )
    );
  };

  return (
    <div>
      <NavBar />
      <SplashCarousel />
      <Introduction
        onSignIn={onSignIn}
        email={loginForm.email}
        setEmail={onLoginFormChange('email')}
        password={loginForm.password}
        setPassword={onLoginFormChange('password')}
      />
      <ProductIntroduction onRegisterAccount={onRegisterAccount} />
      <AboutUs />
    </div>
  );
};

export default withRouter(Landing);
