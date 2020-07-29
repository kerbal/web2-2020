import React, { useState } from 'react';
import ComboBox from '../../../../common/ComboBox';
import Input from '../../../../common/Input';
import VerifyTransaction from './VerifyTransaction';
import axios from '../../../../../utils/axios';

const Container = props => {
  const { children } = props;
  return <div className="flex-1 p-6">{children}</div>;
};

const Transfer = () => {
  const accounts = [
    {
      id: 0,
      account_number: '12345',
      balance: 150000,
    },
    {
      id: 1,
      account_number: '67890',
      balance: 225000,
    },
  ];
  const [currentAccountIndex, setCurrentAccountIndex] = useState(1);
  const [accountId, setAccountId] = useState(accounts[currentAccountIndex].id);
  const [destinationAccountNumber, setDestinationAccountNumber] = useState();
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [sourceBankId, setSourceBankId] = useState('PIGGY');
  const [destinationBankId, setDestinationBankId] = useState('PIGGY');
  const [creating, setCreating] = useState(false);
  const [verify, setVerify] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [destinationAccount, setDestinationAccount] = useState(null);

  const searchDestinationAccount = async () => {
    const res = await axios.get(
      `/customer/account?account_number=${destinationAccountNumber}`
    );
    console.log(res.data);
    if (res.data.length === 1) {
      setDestinationAccount(res.data[0]);
    }
  };

  const createTransaction = async () => {
    setError(null);
    const res = await axios.post('/transaction', {
      source_bank_id: 'PIGGY',
      destination_bank_id: destinationBankId,
      source_account_id: accountId,
      destination_account_id: '',
      amount,
      note,
    });
  };

  return (
    <Container>
      <div className="pb-6 font-bold text-xl">Create a Transfer</div>
      <div className="flex">
        <div className="w-1/3">
          <ComboBox
            label="Source Account"
            onValueChange={accountIndex => {
              setCurrentAccountIndex(accountIndex);
              setAccountId(accounts[currentAccountIndex].id);
            }}
            value={currentAccountIndex}
            disabled={verify}
          >
            {accounts.map((account, index) => (
              <option value={index}>{account.account_number}</option>
            ))}
          </ComboBox>
        </div>
        <div className="pl-6 w-1/3">
          <Input
            label="Remaining Balance"
            disabled
            value={accounts[currentAccountIndex].balance}
          />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3">
          <ComboBox
            label="Destination Bank"
            disabled={verify}
            onValueChange={value => {
              return setDestinationBankId(value);
            }}
          >
            {['Piggy - Bank', 'Chicken Bank'].map(value => (
              <option>{value}</option>
            ))}
          </ComboBox>
        </div>
        <div className="pl-6 w-1/3">
          <Input
            value={destinationAccountNumber}
            label="Destination Account Number"
            disabled={verify}
            onValueChange={value => {
              setDestinationAccountNumber(value);
              searchDestinationAccount();
            }}
          />
        </div>
      </div>
      <div className="w-2/3">
        <Input
          value={amount}
          type="number"
          label="Amount"
          disabled={verify}
          onValueChange={value => setAmount(Math.abs(value))}
        />
      </div>
      <div className="w-2/3 mb-10">
        <Input
          label="Note"
          value={note}
          disabled={verify}
          onValueChange={value => setNote(value)}
        />
      </div>
      {!verify ? (
        <button
          className="btn bg-blue-900 text-white w-2/3 rounded shadow-md text-lg p-2 button"
          type="button"
          disabled={creating}
          onClick={() => {
            setVerify(true);
            setCreating(true);
          }}
        >
          Make transfer
        </button>
      ) : (
        <VerifyTransaction transaction={transaction} />
      )}
    </Container>
  );
};

export default Transfer;
