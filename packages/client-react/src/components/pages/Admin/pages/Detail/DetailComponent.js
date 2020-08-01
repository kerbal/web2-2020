import React, { useState } from 'react';
import PromptModal from '../../../../common/PromptModal';
import FunctionButtom from '../../../../common/FunctionButton';
import Header from '../../components/Header';
import { formatCurrency } from '../../../../../utils';
import TableView from '../../../../common/TableView';
import TopupContainer from '../Topup/TopupContainer';

const TopupModal = props => {
  const { enabled, onDismiss, accountData } = props;
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  // For topupState:
  // 'form': show form so user can type in
  // 'loading': form submitted and sent to server to topup, waiting for response
  // 'done': topup done
  // 'fail': topup fail
  const [topupState, setTopupState] = useState('form');

  const getAccountId = () => {
    const splittedStr = selectedAccount.split(' - ');
    const accountNumber = splittedStr[0].split('Account Number: ')[1];
    const accountItem = accountData.find(
      item => item.account_number === accountNumber
    );
    if (accountItem) {
      return accountItem.id;
    }
    return -1;
  };
  const onSubmitTopup = () => {
    const selectedAccountId = getAccountId();
    const isValidToSubmit = amount !== 0 && typeof amount === 'number' && selectedAccountId !== -1;
    debugger;
    if (isValidToSubmit) {
      setTopupState('loading');
    }
    setTopupState('fail');
  };
  return (
    <PromptModal
      enabled={enabled}
      onDismiss={() => {
        onDismiss();
      }}
      modalName="topup-modal"
      title="Top up customer account"
      content={(
        <TopupContainer
          accountData={accountData}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          topupState={topupState}
          amount={amount}
          setAmount={setAmount}
        />
      )}
      onAccept={() => {
        onSubmitTopup();
      }}
    />
  );
};

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
  const [isLockModalShown, setIsLockModalShown] = useState(true);

  const { customerData, customerDetailData } = props;
  const { fullname, email, birthday, phone_number, address } = customerData;
  const { status, account = [] } = customerDetailData;

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
        <div className="flex flex-1 pl-6 flex-col">
          <FieldTitleContainer>Customer Accounts:</FieldTitleContainer>
          <AccountsTable data={account} />
        </div>
      </ContentContainer>
      {isTopupModalShown && (
        <TopupModal
          enabled={isTopupModalShown}
          onDismiss={() => setIsTopupModalShown(false)}
          accountData={account}
        />
      )}
    </>
  );
};

export default DetailComponent;
