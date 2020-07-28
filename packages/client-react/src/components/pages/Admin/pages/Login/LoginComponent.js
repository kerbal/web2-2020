import React from 'react';
import Logo from '../../../../common/Logo';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

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
  const { children } = props;
  return <div className="flex flex-col w-1/4 mt-6">{children}</div>;
};

const LoginComponent = () => {
  return (
    <Container>
      <LogoContainer>
        <Logo />
        Admin Portal
      </LogoContainer>
      <FormContainer>
        <Input label="Username" />
        <Input label="Password" />
        <Button label="Log in" />
      </FormContainer>
    </Container>
  );
};

export default LoginComponent;
