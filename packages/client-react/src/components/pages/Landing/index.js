import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar';
import SplashCarousel from './components/SplashCarousel';
import Introduction from './components/Introduction';
import ProductIntroduction from './components/ProductIntroduction';
import AboutUs from './components/AboutUs';

const Landing = props => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [, setFormError] = useState(null);
  const [, setFormSending] = useState(false);

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

  const onSignIn = async () => {
    const url = 'https://piggy-bank-api.herokuapp.com/api/auth/login';
    setFormSending(true);
    setFormError(null);
    try {
      const res = await axios.post(url, loginForm);
      setFormSending(false);
      console.log(res);
    } catch (error) {
      console.error(error.response);
      setFormError(error.response);
    }
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
