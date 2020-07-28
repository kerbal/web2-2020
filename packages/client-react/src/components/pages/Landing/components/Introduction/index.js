import React from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

const IntroductionParagraph = () => {
  return (
    <div className="p-12 justify-between flex flex-col">
      <span className="text-xl font-light">
        Register with us to explore the most futuristic bank. It’s plain fast,
        simple with the creating mindset of: it just works.
        <br />
        You don’t need to go through the exhausting opening account process.
        Everything just works right at your fingertip.
      </span>
      <div />
    </div>
  );
};

const InstantLoginBox = props => {
  const { onSignIn, onLoginFormChange, loginForm, formValidator } = props;
  return (
    <form className="m-12 p-6 shadow-xl w-2/5 rounded-lg">
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
      <Button onClick={() => onSignIn && onSignIn()} label="Login" />
    </form>
  );
};

const Introduction = props => {
  return (
    <>
      <div className="flex-row flex">
        <IntroductionParagraph />
        <InstantLoginBox {...props} />
      </div>
    </>
  );
};

export default Introduction;
