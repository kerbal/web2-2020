import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import { images, icons } from '../../../../../assets';

const LoginComponent = memo(function LoginComponent(props) {
  const { onSignIn, onLoginFormChange, loginForm, formValidator } = props;
  return (
    <div
      className="font-family-karla h-full bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${images.background1})` }}
    >
      <div className="container mx-auto flex flex-wrap">
        <div className="overflow-y-auto h-screen md:w-1/2 flex flex-col bg-white">
          <div className="flex justify-center md:justify-start py-12 md:pl-12">
            <img alt="" src={icons.logo} width={80} height="auto" />
          </div>
          <div className=" flex flex-col pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl font-light">
              Sign in to Internet Banking.
            </p>
            <form className="flex flex-col pt-3 md:pt-8">
              {Object.entries(loginForm).map(
                ([
                  key,
                  { type, value, placeholder, validationError, touched },
                ]) => {
                  return (
                    <Input
                      key={key}
                      type={type}
                      id={key}
                      placeholder={placeholder}
                      value={value}
                      validationError={validationError}
                      touched={touched}
                      onValueChange={onLoginFormChange(key)}
                      validator={formValidator(key)}
                    />
                  );
                }
              )}
              <Button type="submit" onClick={onSignIn} label="Login" />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>Haven&#39;t banked with us before?</p>
              <Link
                to="/register"
                className="block underline font-semibold cursor-pointer"
              >
                Open your account now.
              </Link>
              <Link
                to="/"
                className="my-6 block text-red-300 underline font-semibold cursor-pointer"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoginComponent;
