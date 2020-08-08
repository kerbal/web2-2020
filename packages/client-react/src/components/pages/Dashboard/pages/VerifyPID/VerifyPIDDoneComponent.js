import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
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

const VerifyPIDComponentDone = () => {
  return (
    <>
      <Container>
        <Header title="Account Verification" />
        <ContentContainer>
          <IconContainer>
            <img src={icons.done_tick} width={60} height="auto" alt="" />
          </IconContainer>
          <TextContainer>
            <span className="font-medium text-2xl">
              Your information has been sent.
            </span>
            <span className="pt-6">
              We will get back to you once we&#39;re sure that the information
              you provided is valid.
              <br />
              For the meantime, check out our products.
            </span>
          </TextContainer>
          <ButtonContainer>
            <Link
              to="/"
              className="my-6 block text-red-300 underline font-semibold cursor-pointer"
            >
              Back to home
            </Link>
          </ButtonContainer>
        </ContentContainer>
      </Container>
    </>
  );
};

export default VerifyPIDComponentDone;
