import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SplashCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      path:
        'https://firebasestorage.googleapis.com/v0/b/cdn-piggybank.appspot.com/o/carousel1.jpg?alt=media&token=b8b88118-ed8f-49e4-82b1-042d7368bf95',
      alt: 'pic 1',
    },
    {
      id: 2,
      path:
        'https://firebasestorage.googleapis.com/v0/b/cdn-piggybank.appspot.com/o/carousel2.jpg?alt=media&token=2c3ceee3-9ff5-4fc6-b94e-c28d8ca6470f',
      alt: 'pic 2',
    },
    {
      id: 3,
      path:
        'https://firebasestorage.googleapis.com/v0/b/cdn-piggybank.appspot.com/o/carousel3.jpg?alt=media&token=0239bd98-c5c3-465c-9291-2bd391615b60',
      alt: 'pic 3',
    },
  ];

  const appendItems = items => {
    return items.map(item => (
      <div key={item.id} className="relative pb-0 w-full h-64">
        <img
          className="w-full object-cover h-full absolute"
          src={item.path}
          alt={item.alt}
        />
      </div>
    ));
  };

  return (
    <div className="relative overflow-hidden">
      <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
        {appendItems(carouselItems)}
      </Slider>
      <div className="relative container mx-auto ">
        <p className="absolute right-full bottom-0 text-white text-4xl md:text-6xl font-thin px-12 py-6">
          your next bank is just a click away
        </p>
      </div>
    </div>
  );
};

export default SplashCarousel;
