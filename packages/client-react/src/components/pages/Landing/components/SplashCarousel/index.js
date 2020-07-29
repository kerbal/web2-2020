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
    },
    {
      id: 2,
      path:
        'https://firebasestorage.googleapis.com/v0/b/cdn-piggybank.appspot.com/o/carousel2.jpg?alt=media&token=2c3ceee3-9ff5-4fc6-b94e-c28d8ca6470f',
    },
    {
      id: 3,
      path:
        'https://firebasestorage.googleapis.com/v0/b/cdn-piggybank.appspot.com/o/carousel3.jpg?alt=media&token=0239bd98-c5c3-465c-9291-2bd391615b60',
    },
  ];

  const appendItems = items => {
    return items.map(item => (
      <div className="relative pb-0 w-full h-64">
        <img className="w-full object-cover h-full absolute" src={item.path} />
      </div>
    ));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div class="relative overflow-hidden">
      <Slider {...settings}>{appendItems(carouselItems)}</Slider>
      <div className="container mx-auto relative">
        <div class="absolute bottom-0 text-white text-6xl font-thin py-6">
          your next bank is just a click away
        </div>
      </div>
    </div>
  );
};

export default SplashCarousel;
