import React from 'react';
import NavBar from './components/NavBar';
import SplashCarousel from './components/SplashCarousel';
import Introduction from './components/Introduction';
import ProductIntroduction from './components/ProductIntroduction';
import AboutUs from './components/AboutUs';
import { withRouter } from 'react-router-dom';

const Landing = (props) => {
  const onRegisterAccount = () => {
    props.history.push('/dashboard/register');
  }

  return (
    <div>
      <NavBar />
      <SplashCarousel />
      <Introduction />
      <ProductIntroduction onRegisterAccount={onRegisterAccount} />
      <AboutUs />
    </div>
  );
}

export default withRouter(Landing);