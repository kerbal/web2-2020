import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signIn } from '../Dashboard/slice/customerAuthSlice';
import NavBar from './components/NavBar';
import SplashCarousel from './components/SplashCarousel';
import Introduction from './components/Introduction';
import ProductIntroduction from './components/ProductIntroduction';
import AboutUs from './components/AboutUs';
import { checkValidity } from '../../../utils';

const Landing = props => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: {
      value: '',
      rules: {
        required: true,
        isEmail: true,
      },
      validationError: 'Please enter a valid email',
      touched: false,
    },
    password: {
      value: '',
      rules: {
        required: true,
      },
      validationError: 'Please enter your password',
      touched: false,
    },
  });

  const onLoginFormChange = field => {
    return value => {
      const newField = {
        ...loginForm[field],
        value,
        touched: true,
      };
      const newLoginForm = {
        ...loginForm,
        [field]: newField,
      };
      setLoginForm(newLoginForm);
    };
  };

  const formValidator = field => {
    const { value, rules } = loginForm[field];
    return () => {
      return checkValidity(value, rules);
    };
  };

  const onRegisterAccount = () => {
    props.history.push('/dashboard/register');
  };

  const onSignIn = useCallback(
    () =>
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
      ),
    [dispatch]
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

export default withRouter(Landing);
