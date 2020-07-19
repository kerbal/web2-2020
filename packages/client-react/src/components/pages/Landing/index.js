import React from 'react';
import NavBar from './components/NavBar';
import SplashCarousel from './components/SplashCarousel';
import Introduction from './components/Introduction';

export default function Landing() {
  return (
    <div>
      <NavBar />
      <SplashCarousel />
      <Introduction />

    </div>
  );
}
