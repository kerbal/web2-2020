import React, { memo } from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import { images, icons } from '../../../../../assets';

const LoginComponent = memo(function LoginComponent(props) {
  const { onSignIn, onRegisterLinkPress, email, setEmail, emailValidator, password, setPassword, passwordValidator } = props;
  return (
    <div class="bg-white font-family-karla h-screen">
      <div class="w-full flex flex-wrap">
        <div class="w-full md:w-1/2 flex flex-col">
          <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <img src={icons.logo} alt={''} width={80} height={'auto'} />
          </div>
          <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p class="text-center text-3xl font-light">
              Sign in to Internet Banking.
            </p>
            <div class="flex flex-col pt-3 md:pt-8">
              <Input
                label={'Email'}
                type={'email'}
                id={'email'}
                placeholder={'your@email.com'}
                value={email}
                onValueChange={setEmail}
                validator={emailValidator}
              />
              <Input
                label={'Password'}
                type={'password'}
                id={'password'}
                placeholder={'Password'}
                value={password}
                onValueChange={setPassword}
                validator={passwordValidator}
              />
              <Button onClick={() => onSignIn && onSignIn()} label={'Login'} />
            </div>
            <div class="text-center pt-12 pb-12">
              <p>
                Haven't banked with us before?
              </p>
              <div onClick={() => onRegisterLinkPress && onRegisterLinkPress()} class="underline font-semibold">
                Open your account now.
              </div>
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

export default LoginComponent;
