import React, { useState } from 'react';
import ComboBox from '../../../../common/ComboBox';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

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
          <ComboBox label="Destination Bank" onValueChange={() => {}}>
            {['Piggy - Bank', 'Chicken Bank'].map(value => (
              <option>{value}</option>
            ))}
          </ComboBox>
        </div>
        <div className="pl-6 w-1/3">
          <Input
            value={destinationAccountNumber}
            label="Destination Account Number"
            onValueChange={value => setDestinationAccountNumber(value)}
          />
        </div>
      </div>
      <div className="w-2/3">
        <Input
          value={amount}
          label="Amount"
          onValueChange={value => setAmount(value)}
        />
      </div>
      <div className="w-2/3">
        <Input
          label="Note"
          value={note}
          onValueChange={value => setNote(value)}
        />
      </div>
      {/* <div className="w-2/3 flex">
        <div className="w-3/4">
          <Input label="Verified OTP" />
        </div>
        <div className="align-text-bottom self-end pb-2 pl-6">Get OTP Code</div>
      </div> */}
      <button className="bg-blue-900 text-white">Make transfer</button>
    </Container>
  );
};

export default Transfer;
