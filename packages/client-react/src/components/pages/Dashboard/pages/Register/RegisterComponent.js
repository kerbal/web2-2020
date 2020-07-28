import React, { memo } from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import { images, icons } from '../../../../../assets';

export default memo(function RegisterComponent() {
  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <img src={icons.logo} alt="" width={80} height="auto" />
          </div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl font-light">Open an account</p>
            <div className="flex flex-col py-3 pb-12 md:py-8">
              <Input
                label="Full Name"
                type="text"
                id="full-name"
                placeholder="John Doe"
              />
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="your@email.com"
              />
              <Input
                label="Phone Number"
                type="phone"
                id="phone"
                placeholder="10 digits"
              />
              <Input
                label="Date of Birth"
                type="date"
                id="date-of-birth"
                placeholder="DD/MM/YYYY"
              />
              <Input
                label="Place of Birth"
                type="text"
                id="place-of-birth"
                placeholder="Your City / Province"
              />
              <Button label="Register" />
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            alt=""
            className="object-cover w-full h-screen hidden md:block"
            src={images.background1}
          />
        </div>
      </div>
    </div>
  );
});
