import React from 'react';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

const IntroductionParagraph = () => {
  return (
    <div class="p-12 justify-between flex flex-col">
      <span class="text-xl font-light">
        Register with us to explore the most futuristic bank. It’s plain fast,
        simple with the creating mindset of: it just works. <br />
        You don’t need to go through the exhausting opening account process.
        Everything just works right at your fingertip.
      </span>
      <div />
    </div>
  );
};

const InstantLoginBox = props => {
  const {
    onSignIn,
    email,
    setEmail,
    emailValidator,
    password,
    setPassword,
    passwordValidator,
  } = props;
  return (
    <div class="m-12 p-6 shadow-xl w-2/5 rounded-lg">
      <span class="text-center text-xl font-light">
        Already have an account? Login now.
      </span>
      <Input
        type={'email'}
        id={'email'}
        placeholder={'your@email.com'}
        value={email}
        onValueChange={setEmail}
        validator={emailValidator}
      />
      <Input
        type={'password'}
        id={'password'}
        placeholder={'Password'}
        value={password}
        onValueChange={setPassword}
        validator={passwordValidator}
      />
      <Button onClick={() => onSignIn && onSignIn()} label={'Login'} />
    </div>
  );
};

const Introduction = props => {
  return (
    <>
      <div class="flex-row flex">
        <IntroductionParagraph />
        <InstantLoginBox {...props} />
      </div>
    </>
  );
};

export default Introduction;
