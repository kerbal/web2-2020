import React from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import Loading from '../../../../common/Loading';
import { images } from '../../../../../assets';

export default ({
  registerForm,
  formValidator,
  onFormChange,
  onRegister,
  loadingForm,
  errorMessage,
}) => {
  return (
    <div
      className="font-family-karla h-full bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${images.background1})` }}
    >
      <div className="container mx-auto flex flex-wrap justify-end">
        <div className="relative overflow-y-auto h-screen md:w-1/2 justify-center flex flex-col bg-white">
          <div className=" flex flex-col pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl font-light">Open an account</p>
            {errorMessage}
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
              <Button onClick={onRegister} label="Register" />
              {loadingForm && <Loading />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
