import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PromptModal from '../../../../common/PromptModal';
import TopupContainer from '../Topup/TopupContainer';
import Input from '../../../../common/Input';
import { topupAnAccount } from '../../api/adminCustomer';

const FieldContainer = props => {
  const { children } = props;
  return <div className="flex items-center">{children}</div>;
};

const FieldText = props => {
  const { children } = props;
  return <div className="">{children}</div>;
};

const FieldContent = props => {
  const { children } = props;
  return <div className="pl-6">{children}</div>;
};

const TopupModal = props => {
  const { enabled, onDismiss, accountData } = props;
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
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

  const validateInputs = () => {
    const selectedAccountId = selectedAccount ? getAccountId() : -1;
    if (selectedAccountId === -1 && !amount) {
      setError('Please choose an account and set an amount');
      return false;
    }
    if (selectedAccountId === -1) {
      setError('Please choose an account');
      return false;
    }
    if (!amount || amount === 0 || typeof amount !== 'number') {
      setError('Please set a valid amount');
      return false;
    }
    return true;
  };

  const token = useSelector(state => state.adminAuth.token);

  const onSubmitTopup = async () => {
    if (topupState !== 'form') {
      onDismiss();
      return;
    }
    if (validateInputs()) {
      setTopupState('loading');
      const selectedAccountId = selectedAccount ? getAccountId() : -1;
      console.log(selectedAccountId, amount);
      const result = await topupAnAccount(selectedAccountId, amount, token);
      if (result && result.data) {
        console.log(result.data);
        if (result.data.message === 'successful') {
          setTopupState('done');
          return;
        }
      }
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
        <>
          <TopupContainer
            accountData={accountData}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            topupState={topupState}
            error={error}
            amount={amount}
            setAmount={setAmount}
          />
          {topupState === 'form' && (
            <>
              <FieldContainer>
                <div className="pt-4">
                  <FieldText>Amount:</FieldText>
                </div>
                <FieldContent>
                  <div className="pt-4">
                    <Input
                      value={amount}
                      type="number"
                      onValueChange={value => setAmount(+value)}
                    />
                  </div>
                </FieldContent>
              </FieldContainer>
              {error && <div className="pt-4 text-red-600">{error}</div>}
            </>
          )}
        </>
      )}
      onAccept={() => {
        onSubmitTopup();
      }}
    />
  );
};

export default TopupModal;
