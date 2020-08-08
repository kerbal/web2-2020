import React, { useState } from 'react';
import PromptModal from '../../../../common/PromptModal';
import FunctionButtom from '../../../../common/FunctionButton';
import Header from '../../components/Header';
import { formatCurrency } from '../../../../../utils';
import TableView from '../../../../common/TableView';
import TopupModal from './TopupModal';
import VerifyModal from './VerifyModal';
import LockModal from './LockModal';
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

const AccountsTable = props => {
  const { data = [] } = props;
  const name = 'dashboard-transaction-table';
  const columns = ['Account Number', 'Balance', 'Currency Unit', 'Status'];

  const formattedData = data.map(item => {
    if (item) {
      return {
        id: item.id,
        accountNumber: item.account_number,
        balance: formatCurrency(item.balance),
        currencyUnit: item.currency_unit,
        status: item.status,
      };
    }
    return {};
  });
  const onClick = () => {
    console.log('clicked');
  };

  return (
    <TableView
      name={name}
      columns={columns}
      data={formattedData}
      onClick={onClick}
    />
  );
};

const DetailComponent = props => {
  const [isTopupModalShown, setIsTopupModalShown] = useState(false);
  const [isVerifyModalShown, setIsVerifyModalShown] = useState(false);
  const [isLockModalShown, setIsLockModalShown] = useState(false);

  const { customerData, customerDetailData, loading } = props;
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
              <FieldContentContainer>{birthday}</FieldContentContainer>
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
        <div className="flex flex-1 pl-6 flex-col">
          <FieldTitleContainer>Customer Accounts:</FieldTitleContainer>
          <AccountsTable data={Accounts} />
        </div>
      </ContentContainer>
      {isTopupModalShown && (
        <TopupModal
          enabled={isTopupModalShown}
          onDismiss={() => setIsTopupModalShown(false)}
          accountData={Accounts}
        />
      )}
      {isVerifyModalShown && (
        <VerifyModal
          enabled={isTopupModalShown}
          onDismiss={() => setIsVerifyModalShown(false)}
          accountData={Accounts}
        />
      )}
      {isLockModalShown && (
        <LockModal
          enabled={isTopupModalShown}
          onDismiss={() => setIsLockModalShown(false)}
          accountData={Accounts}
        />
      )}
      {loading && <Loading />}
    </>
  );
};

export default DetailComponent;
