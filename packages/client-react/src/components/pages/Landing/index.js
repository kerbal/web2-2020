import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import SplashCarousel from './components/SplashCarousel';
import Introduction from './components/Introduction';
import ProductIntroduction from './components/ProductIntroduction';
import AboutUs from './components/AboutUs';
import { withRouter } from 'react-router-dom';

const Landing = props => {
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
    const url = 'https://piggy-bank-api.herokuapp.com/api/auth/login';
    axios
      .post(url, loginForm)
      .then(data => console.log(data))
      .catch(error => console.log(error));
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
