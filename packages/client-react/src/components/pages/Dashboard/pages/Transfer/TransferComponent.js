import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import _ from 'lodash';
import ComboBox from '../../../../common/ComboBox';
import Input from '../../../../common/Input';
import VerifyTransaction from './VerifyTransaction';
import axios from '../../../../../utils/axios';
import Loading from '../../../../common/Loading';

const Container = ({ children }) => {
  return <div className="flex-1 p-6">{children}</div>;
};

const Transfer = props => {
  const { accounts } = props;
  const { refresh } = props;
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
  const [accountId, setAccountId] = useState(
    (accounts[currentAccountIndex] || {}).id
  );
  const [destinationAccountNumber, setDestinationAccountNumber] = useState();
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [destinationBankId, setDestinationBankId] = useState('PIGGY');
  const [creating, setCreating] = useState(false);
  const [verify, setVerify] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [error, setError] = useState(null);
  const [destinationAccount, setDestinationAccount] = useState(null);
  const [currencyUnit, setCurrencyUnit] = useState('VND');
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state.customerAuth.token);

  const searchDestinationAccount = async value => {
    setLoading(true);
    const res = await axios.get(
      `/customer/account?account_number=${value}&other=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.length === 1) {
      setDestinationAccount(res.data[0]);
    }
    setLoading(false);
  };

  const createTransaction = async () => {
    setLoading(true);
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
          currency_unit: currencyUnit,
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
    setLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const desAccountNumber = urlParams.get('destination_account_number');
    const sourceAccountNumber = urlParams.get('source_account_number');

    if (desAccountNumber) {
      setDestinationAccountNumber(desAccountNumber);
      if (`${desAccountNumber}`.length === 16) {
        searchDestinationAccount(desAccountNumber);
      }
    }

    if (sourceAccountNumber) {
      const index = accounts.findIndex(
        acc => acc.account_number === sourceAccountNumber
      );
      if (index >= 0) {
        setCurrentAccountIndex(index);
        setAccountId(accounts[index].id);
      }
    }
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      <div className="pb-6 font-bold text-xl">Create a Transfer</div>
      <div className="flex">
        <div className="w-1/3">
          <ComboBox
            label="Source Account"
            onValueChange={accountIndex => {
              setCurrentAccountIndex(accountIndex);
              setAccountId(accounts[accountIndex].id);
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
            value={(accounts[currentAccountIndex] || {}).balance}
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
            {['Piggy Bank', 'Chicken Bank'].map(value => (
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
        <div className="mb-4">
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
      <div className="flex">
        <div className="w-1/3">
          <Input
            value={amount}
            type="number"
            label="Amount"
            disabled={verify}
            onValueChange={value => setAmount(Math.abs(value))}
          />
        </div>
        <div className="w-1/3 mb-10 pl-6">
          <ComboBox
            label="Currency Unit"
            disabled={verify}
            value={currencyUnit}
            onValueChange={value => {
              return setCurrencyUnit(value);
            }}
          >
            <option>VND</option>
            <option>USD</option>
          </ComboBox>
        </div>
      </div>
      <div className="w-2/3 mb-10 pr-2">
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

export default connect(state => ({
  accounts: state.customerAccounts.accounts,
}))(Transfer);
