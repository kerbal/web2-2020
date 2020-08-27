import React from 'react';
import Logo from '../../../../common/Logo';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';
import Loading from '../../../../common/Loading';

const Container = props => {
  const { children } = props;
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

const LogoContainer = props => {
  const { children } = props;
  return (
    <div className="flex justify-center items-center text-xl font-medium">
      {children}
    </div>
  );
};

const FormContainer = props => {
  const { children, onKeyPress } = props;
  return (
    <div
      className="flex flex-col w-1/4 mt-6"
      onKeyPress={e => onKeyPress && onKeyPress(e)}
    >
      {children}
    </div>
  );
};

const LoginComponent = props => {
  const {
    loading,
    onSignIn,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    onEnter,
    errorMessage,
  } = props;
  return (
    <>
      <Container>
        <LogoContainer>
          <Logo />
          Admin Portal
        </LogoContainer>
        {errorMessage}
        <FormContainer onKeyPress={onEnter}>
          <Input
            label="Username"
            value={emailInput}
            onValueChange={setEmailInput}
            autoComplete="off"
          />
          <Input
            label="Password"
            value={passwordInput}
            onValueChange={setPasswordInput}
            type="password"
            autoComplete="off"
          />
          <Button label="Log in" onClick={() => onSignIn && onSignIn()} />
        </FormContainer>
      </Container>
      {loading && <Loading />}
    </>
  );
};

export default LoginComponent;
