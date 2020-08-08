import React, { useState } from 'react';
import PromptModal from '../../../../common/PromptModal';
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
    if (selectedAccount) {
      const selectedAccountId = getAccountId();
      const isValidToSubmit =
        amount !== 0 && typeof amount === 'number' && selectedAccountId !== -1;
      if (isValidToSubmit) {
        setTopupState('loading');
      }
      setTopupState('fail');
    } else onDismiss();
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

export default TopupModal;
