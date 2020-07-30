import React, { useState } from 'react';
import PromptModal from '../../../../common/PromptModal';
import FunctionButtom from '../../../../common/FunctionButton';
import Header from '../../components/Header';

const ContentContainer = props => {
  const { children } = props;
  return <div className="flex flex-row p-6 w-screen">{children}</div>;
};

const ToolbarContainer = props => {
  const { children } = props;
  return (
    <div className="flex justify-between items-center mb-3">{children}</div>
  );
};

const CustomerInfoContainer = props => {
  const { children } = props;
  return <div className="flex flex-row">{children}</div>;
};

const FieldTitleContainer = props => {
  const { children } = props;
  return <div className="pt-3 font-bold">{children}</div>;
};

const FieldContentContainer = props => {
  const { children } = props;
  return <div className="pt-3">{children}</div>;
};

const ActionButtonsContainer = props => {
  const { children } = props;
  return <div className="flex flex-col pt-6">{children}</div>;
};

const ButtonContainer = props => {
  const { children } = props;
  return <div className="w-1/4 pt-6">{children}</div>;
};

const DetailComponent = () => {
  const [isLockModalShown, setIsLockModalShown] = useState(true);
  const dataString = `{
    "id": 1,
    "fullname": "Test customer 1",
    "email": "huynonstop123nt@gmail.com",
    "birthday": "2020-01-01T00:00:00.000Z",
    "phone_number": "111111111",
    "address": "abcdef 111"
  }`;
  const data = JSON.parse(dataString);
  const { fullname, email, birthday, phone_number, address } = data;
  // return (
  //   <div>
  //     <FunctionButtom
  //       label="Update"
  //       onClick={() => {
  //         setIsLockModalShown(true);
  //       }}
  //     />
  //     <PromptModal
  //       enabled={isLockModalShown}
  //       onDismiss={() => {
  //         setIsLockModalShown(false);
  //       }}
  //       modalName="lock-confirm-modal"
  //       title="Alert"
  //       content="Are you sure locking this user?"
  //     />
  //   </div>
  // );
  return (
    <>
      <Header pageTitle="Customer Detail" />
      <ContentContainer>
        <div className="flex flex-col w-full">
          <CustomerInfoContainer>
            <div className="flex flex-col">
              <FieldTitleContainer>Full Name:</FieldTitleContainer>
              <FieldTitleContainer>Email:</FieldTitleContainer>
              <FieldTitleContainer>Day of Birth:</FieldTitleContainer>
              <FieldTitleContainer>Phone Number:</FieldTitleContainer>
              <FieldTitleContainer>Address:</FieldTitleContainer>
            </div>
            <div className="flex flex-col pl-12">
              <FieldContentContainer>{fullname}</FieldContentContainer>
              <FieldContentContainer>{email}</FieldContentContainer>
              <FieldContentContainer>{birthday}</FieldContentContainer>
              <FieldContentContainer>{phone_number}</FieldContentContainer>
              <FieldContentContainer>{address}</FieldContentContainer>
            </div>
          </CustomerInfoContainer>
          <ActionButtonsContainer>
            <ButtonContainer>
              <FunctionButtom
                label="Top up"
                onClick={() => {
                  setIsLockModalShown(true);
                }}
              />
            </ButtonContainer>
            <ButtonContainer>
              <FunctionButtom
                label="Verify Customer"
                onClick={() => {
                  setIsLockModalShown(true);
                }}
              />
            </ButtonContainer>
            <ButtonContainer>
              <FunctionButtom
                label="Lock Customer"
                onClick={() => {
                  setIsLockModalShown(true);
                }}
              />
            </ButtonContainer>
          </ActionButtonsContainer>
        </div>
        <div>
          <div>auidn</div>
        </div>
      </ContentContainer>
    </>
  );
};

export default DetailComponent;
