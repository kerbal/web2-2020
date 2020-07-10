import React, { memo } from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import { images, icons } from '../../../../../assets';

const LoginComponent = memo(function LoginComponent(props) {
  const { onSignIn, onRegisterLinkPress, email, setEmail, emailValidator, password, setPassword, passwordValidator } = props;
  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <img src={icons.logo} alt={''} width={80} height={'auto'} />
          </div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl font-light">
              Sign in to Internet Banking.
            </p>
            <div className="flex flex-col pt-3 md:pt-8">
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
            <div className="text-center pt-12 pb-12">
              <p>
                Haven't banked with us before?
              </p>
              <div onClick={() => onRegisterLinkPress && onRegisterLinkPress()} className="underline font-semibold">
                Open your account now.
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            alt={''}
            className="object-cover w-full h-screen hidden md:block"
            src={images.background1}
          />
        </div>
      </div>
    </div>
  );
});

export default LoginComponent;
