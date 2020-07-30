import React, { memo } from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import { images, icons } from '../../../../../assets';

export default memo(function RegisterComponent({
  registerForm,
  formValidator,
  onFormChange,
  onRegister,
}) {
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
              {Object.entries(registerForm).map(
                ([
                  key,
                  { label, type, value, placeholder, validationError, touched },
                ]) => {
                  return (
                    <Input
                      key={key}
                      name={key}
                      label={label}
                      type={type}
                      id={key}
                      placeholder={placeholder}
                      value={value}
                      validationError={validationError}
                      touched={touched}
                      onValueChange={onFormChange(key)}
                      validator={formValidator(key)}
                    />
                  );
                }
              )}
              <Button
                onClick={() => onRegister && onRegister()}
                label="Register"
              />
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
