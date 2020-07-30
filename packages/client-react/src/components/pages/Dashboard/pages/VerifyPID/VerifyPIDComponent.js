import React from 'react';
import Header from '../../components/Header';
import Loading from '../../../../common/Loading';
import ImageUploader from '../../../../common/ImageUploader';
import Button from '../../../../common/Button';

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

const ImagesContainer = props => {
  return <div className="flex">{props.children}</div>;
};

const ImageIndividuallyContainer = props => {
  return (
    <div>
      {props.children}
      <div className="pt-6 text-center text-gray-600">{props.name}</div>
    </div>
  );
};

const ButtonContainer = props => {
  return <div className="w-1/5">{props.children}</div>;
};

const VerifyPIDComponent = props => {
  const {
    loading,
    frontSidePIDImgUrl,
    setFrontSidePIDImgUrl,
    rearSidePIDImgUrl,
    setRearSidePIDImgUrl,
    onSubmit,
  } = props;

  return (
    <>
      <Container>
        <Header title="Account Verification" disableCurrentTime />
        <ContentContainer>
          <TextContainer>
            <span className="font-medium text-2xl">
              Your account has not yet verified.
            </span>
            <span className="pt-6">
              In order to use our services, your account must be verified first.
              <br />
              <br />
              To continue, please update your PID images (both front-side and
              rear-side).
              <br />
              We will get back to you once we&#39;re sure that the information
              you provided is valid.
            </span>
          </TextContainer>
          <ImagesContainer>
            <ImageIndividuallyContainer name="Front side">
              <ImageUploader
                imageUrl={frontSidePIDImgUrl}
                setImageUrl={setFrontSidePIDImgUrl}
              />
            </ImageIndividuallyContainer>

            <div className="w-12" />
            <ImageIndividuallyContainer name="Rear-side">
              <ImageUploader
                imageUrl={rearSidePIDImgUrl}
                setImageUrl={setRearSidePIDImgUrl}
              />
            </ImageIndividuallyContainer>
          </ImagesContainer>
          <ButtonContainer>
            <Button label="Submit" onClick={() => onSubmit && onSubmit()} />
          </ButtonContainer>
        </ContentContainer>
      </Container>
      {loading && <Loading />}
    </>
  );
};

export default VerifyPIDComponent;
