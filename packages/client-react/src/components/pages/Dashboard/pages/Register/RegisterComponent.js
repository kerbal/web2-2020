import React, { memo } from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import { images, icons } from '../../../../../assets';

export default memo(function RegisterComponent() {
  return (
    <div class="bg-white font-family-karla h-screen">
      <div class="w-full flex flex-wrap">
        <div class="w-full md:w-1/2 flex flex-col">
          <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <img src={icons.logo} alt={''} width={80} height={'auto'} />
          </div>
          <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p class="text-center text-3xl font-light">
              Open an account
            </p>
            <div class="flex flex-col pt-3 md:pt-8">
              <Input
                label={'Full Name'}
                type={'text'}
                id={'full-name'}
                placeholder={'John Doe'}
              />
              <Input
                label={'Email'}
                type={'email'}
                id={'email'}
                placeholder={'your@email.com'}
              />
              <Input
                label={'Date of Birth'}
                type={'date'}
                id={'date-of-birth'}
                placeholder={'DD/MM/YYYY'}
              />
              <Input
                label={'Place of Birth'}
                type={'text'}
                id={'place-of-birth'}
                placeholder={'Your City / Province'}
              />
              <Input
                label={'PID Number'}
                type={'number'}
                id={'pid-number'}
                placeholder={'9 digits or 12 digits'}
              />
              <Input
                label={'Issued Date'}
                type={'date'}
                id={'pid-issued-date'}
                placeholder={'DD/MM/YYYY'}
              />
              <Input
                label={'Issued Place'}
                type={'text'}
                id={'pid-issued-place'}
                placeholder={'Your City / Province'}
              />
              <Button label={'Register'} />
            </div>
          </div>
        </div>
        <div class="w-1/2 shadow-2xl">
          <img
            alt={''}
            class="object-cover w-full h-screen hidden md:block"
            src={images.background1}
          />
        </div>
      </div>
    </div>
  );
});
