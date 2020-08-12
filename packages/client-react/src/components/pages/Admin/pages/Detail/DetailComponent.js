import React, { useState } from 'react';
import { formatDatetime } from '../../../../../utils/'
import FunctionButtom from '../../../../common/FunctionButton';
import Header from '../../components/Header';
import AccountsTable from './AccountsTable';
import TopupModal from './TopupModal';
import VerifyModal from './VerifyModal';
import TransactionModal from './TransactionModal';
import Loading from '../../../../common/Loading';

const ContentContainer = props => {
  const { children } = props;
  return <div className="flex flex-row p-6 w-screen">{children}</div>;
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
  return <div className="pt-6 w-2/3">{children}</div>;
};

const DetailComponent = props => {
  const [isTopupModalShown, setIsTopupModalShown] = useState(false);
  const [isVerifyModalShown, setIsVerifyModalShown] = useState(false);
  const [isTransactionModalShown, setIsTransactionModalShown] = useState(false);

  const {
    customerData,
    customerDetailData,
    loading,
    customerId,
    selectedAccountToViewTrans,
    setselectedAccountToViewTrans,
  } = props;
  const { fullname, email, birthday, phone_number, address } = customerData;
  const { status, Accounts = [] } = customerDetailData;

  return (
    <>
      <Header pageTitle="Customer Detail" />
      <ContentContainer>
        <div className="flex flex-col">
          <CustomerInfoContainer>
            <div className="flex flex-col">
              <FieldTitleContainer>Full Name:</FieldTitleContainer>
              <FieldTitleContainer>Email:</FieldTitleContainer>
              <FieldTitleContainer>Day of Birth:</FieldTitleContainer>
              <FieldTitleContainer>Phone Number:</FieldTitleContainer>
              <FieldTitleContainer>Address:</FieldTitleContainer>
              <FieldTitleContainer>Customer Status:</FieldTitleContainer>
            </div>
            <div className="flex flex-col pl-12">
              <FieldContentContainer>{fullname}</FieldContentContainer>
              <FieldContentContainer>{email}</FieldContentContainer>
              <FieldContentContainer>{formatDatetime(birthday)}</FieldContentContainer>
              <FieldContentContainer>{phone_number}</FieldContentContainer>
              <FieldContentContainer>{address}</FieldContentContainer>
              <FieldContentContainer>{status}</FieldContentContainer>
            </div>
          </CustomerInfoContainer>
          <ActionButtonsContainer>
            <ButtonContainer>
              <FunctionButtom
                label="Top up"
                onClick={() => {
                  setIsTopupModalShown(true);
                }}
              />
            </ButtonContainer>
            <ButtonContainer>
              <FunctionButtom
                disabled={status === 'VERIFIED'}
                label="Verify Customer"
                onClick={() => {
                  setIsVerifyModalShown(true);
                }}
              />
            </ButtonContainer>
          </ActionButtonsContainer>
        </div>
        <div className="flex flex-1 pl-6 flex-col">
          <FieldTitleContainer>Customer Accounts:</FieldTitleContainer>
          <AccountsTable
            data={Accounts}
            setselectedAccountToViewTrans={setselectedAccountToViewTrans}
            setIsTransactionModalShown={setIsTransactionModalShown}
          />
        </div>
      </ContentContainer>
      {isTopupModalShown && (
        <TopupModal
          enabled={isTopupModalShown}
          onDismiss={() => {
            setIsTopupModalShown(false);
            window.location.reload();
          }}
          accountData={Accounts}
        />
      )}
      {isVerifyModalShown && (
        <VerifyModal
          enabled={isTopupModalShown}
          onDismiss={() => setIsVerifyModalShown(false)}
          accountData={Accounts}
          customerId={customerId}
        />
      )}
      {isTransactionModalShown && (
        <TransactionModal
          enabled={isTransactionModalShown}
          onDismiss={() => setIsTransactionModalShown(false)}
          accountData={Accounts}
          selectedAccountToViewTrans={selectedAccountToViewTrans}
        />
      )}
      {loading && <Loading />}
    </>
  );
};

export default DetailComponent;
