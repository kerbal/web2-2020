import React from 'react';
import Header from '../../components/Header';
import Button from '../../../../common/Button';
import { icons } from '../../../../../assets';

const Container = props => {
  return <div className="w-screen">{props.children}</div>;
};

const ContentContainer = props => {
  return (
    <div className="flex flex-col flex-1 pt-16 justify-center items-center">
      {props.children}
    </div>
  );
};

const TextContainer = props => {
  return (
    <div className="flex flex-col w-1/2 text-center">{props.children}</div>
  );
};

const IconContainer = props => {
  return <div className="py-6 pb-12">{props.children}</div>;
};

const ButtonContainer = props => {
  return <div className="w-1/5">{props.children}</div>;
};

const VerifyPIDComponentDone = props => {
  const { onGoHome } = props;
  return (
    <>
      <Container>
        <Header title={`Account Verification`} disableCurrentTime />
        <ContentContainer>
          <IconContainer>
            <img src={icons.done_tick} width={60} height="auto" alt="" />
          </IconContainer>
          <TextContainer>
            <span className="font-medium text-2xl">
              Your information has been sent.
            </span>
            <span className="pt-6">
              We will get back to you once we're sure that the information you
              provided is valid.
              <br />
              For the meantime, check out our products.
            </span>
          </TextContainer>
          <ButtonContainer>
            <Button
              label="Return to home"
              onClick={() => onGoHome && onGoHome()}
            />
          </ButtonContainer>
        </ContentContainer>
      </Container>
    </>
  );
};

export default VerifyPIDComponentDone;
