import React from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import Loading from '../../../../common/Loading';

const IntroductionParagraph = () => {
  return (
    <div className="md:mr-12 mb-12 md:mb-0 justify-between flex flex-col flex-auto">
      <span className="text-xl font-light">
        Register with us to explore the most futuristic bank. It’s plain fast,
        simple with the creating mindset of: it just works.
        <br />
        You don’t need to go through the exhausting opening account process.
        Everything just works right at your fingertip.
      </span>
    </div>
  );
};

const InstantLoginBox = props => {
  const {
    onSignIn,
    onLoginFormChange,
    loginForm,
    formValidator,
    loadingFrom,
  } = props;
  return (
    <form className="overflow-hidden relative mx-16 md:mx-0 p-6 shadow-xl border-t-2 border-gray-600 flex-auto lg:flex-1-2/5 rounded-lg">
      <span className="text-center text-xl font-light">
        Already have an account? Login now.
      </span>
      {Object.entries(loginForm).map(
        ([key, { type, value, placeholder, validationError, touched }]) => {
          return (
            <Input
              key={key}
              type={type}
              id={key}
              name={key}
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
      <Button onClick={onSignIn} label="Login" />
      {loadingFrom && <Loading />}
    </form>
  );
};

const Introduction = props => {
  return (
    <>
      <div className="container px-12 my-12 mx-auto flex flex-col md:flex-row">
        <IntroductionParagraph />
        <InstantLoginBox {...props} />
      </div>
    </>
  );
};

export default Introduction;
