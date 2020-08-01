import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ComboBox from '../../../../common/ComboBox';
import Input from '../../../../common/Input';
import VerifyTransaction from './VerifyTransaction';
import axios from '../../../../../utils/axios';

const Container = ({ children }) => {
  return <div className="flex-1 p-6">{children}</div>;
};

const Transfer = props => {
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
  const { refresh } = props;
  const [currentAccountIndex, setCurrentAccountIndex] = useState(1);
  const [accountId, setAccountId] = useState(accounts[currentAccountIndex].id);
  const [destinationAccountNumber, setDestinationAccountNumber] = useState();
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  // const [sourceBankId, setSourceBankId] = useState('PIGGY');
  const [destinationBankId, setDestinationBankId] = useState('PIGGY');
  const [creating, setCreating] = useState(false);
  const [verify, setVerify] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [error, setError] = useState(null);
  const [destinationAccount, setDestinationAccount] = useState(null);
  const token = useSelector(state => state.customerAuth.token);

  const searchDestinationAccount = async value => {
    const res = await axios.get(`/customer/account?account_number=${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.length === 1) {
      setDestinationAccount(res.data[0]);
    }
  };

  const createTransaction = async () => {
    setError(null);
    try {
      const res = await axios.post(
        '/transaction',
        {
          source_bank_id: 'PIGGY',
          destination_bank_id: destinationBankId,
          source_account_id: accountId,
          destination_account_id: destinationAccount.id,
          amount,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactionId(res.data.transaction_id);
      setVerify(true);
    } catch (err) {
      setError(_.get(err, 'response.data.message') || err.message);
    }
    setCreating(false);
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
              <option value={index} key={account.account_number}>
                {account.account_number}
              </option>
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
      <div className="flex mb-6">
        <div className="w-1/3">
          <ComboBox
            label="Destination Bank"
            disabled={verify}
            onValueChange={value => {
              return setDestinationBankId(value);
            }}
          >
            {['Piggy - Bank', 'Chicken Bank'].map(value => (
              <option key={value}>{value}</option>
            ))}
          </ComboBox>
        </div>
        <div className="pl-6 w-1/3">
          <Input
            value={destinationAccountNumber}
            label="Destination Account Number"
            disabled={verify}
            onValueChange={async value => {
              setDestinationAccountNumber(value);
              if (`${value}`.length === 16) {
                searchDestinationAccount(value);
              }
            }}
          />
        </div>
      </div>
      {destinationAccount && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Destination account</h3>
          <p className="mb-1">
            <span className="font-semibold mr-2">Name:</span>
            {destinationAccount.Customer.fullname}
          </p>
          <p className="mb-1">
            <span className="font-semibold mr-2">Email:</span>
            {destinationAccount.Customer.email}
          </p>
          <p className="mb-1">
            <span className="font-semibold mr-2">Phone number:</span>
            {destinationAccount.Customer.phone_number}
          </p>
        </div>
      )}
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
        <div className="w-2/3">
          {destinationAccount && (
            <button
              className="btn bg-blue-900 text-white rounded shadow-md text-lg p-2 button mb-4 w-full"
              type="button"
              disabled={creating}
              onClick={() => {
                setCreating(true);
                createTransaction();
              }}
            >
              Make transfer
            </button>
          )}
          {error && <p className="text-lg text-red-500">{error}</p>}
        </div>
      ) : (
        <VerifyTransaction transactionId={transactionId} refresh={refresh} />
      )}
    </Container>
  );
};

export default Transfer;
