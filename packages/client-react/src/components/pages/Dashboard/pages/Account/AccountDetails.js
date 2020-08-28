import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '../../../../common/Button';
import Input from '../../../../common/Input';
import { formatDatetime } from '../../../../../utils';

export default ({ account, onChangeStatus, onClosed, onConfirmDeposit }) => {
  const {
    status,
    type,
    account_number: accountNumber,
    balance,
    closed_date: closedAt,
    currency_unit: cU,
    createdAt,
    updatedAt,
  } = account;
  const history = useHistory();
  let details = null;
  if (type === 'CHECKING') {
    details = (
      <>
        {status !== 'CLOSED' ? (
          <Button
            label={status === 'NORMAL' ? 'Lock' : 'Unlock'}
            onClick={onChangeStatus}
          />
        ) : (
          <Input
            label="Closed at"
            disabled
            value={formatDatetime(closedAt) || ''}
          />
        )}
        {status === 'NORMAL' && (
          <Button
            label="Transfer to this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?destination_account_number=${accountNumber}`
              );
            }}
          />
        )}
        {status === 'NORMAL' && balance !== 0 && (
          <Button
            label="Transfer from this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?source_account_number=${accountNumber}`
              );
            }}
          />
        )}
        <Link to={`/dashboard/transaction?account_number=${accountNumber}`}>
          <Button label="Transaction" />
        </Link>
        {status !== 'CLOSED' && (
          <Button label="Close" secondary onClick={onClosed} />
        )}
      </>
    );
  }
  if (type === 'DEPOSIT') {
    const { deposit_date: depositDate, depositType } =
      account?.depositAccountDetail || {};
    const { expiry_time: expiryTime, interest_rate: interestRate } =
      depositType || {};
    details = (
      <>
        <Input label="Time" disabled value={`${expiryTime} months`} />
        <Input
          label="Interest rate"
          disabled
          value={`${interestRate * 100}% / month`}
        />
        <Input
          label="Deposited at"
          disabled
          value={formatDatetime(depositDate) || 'Add funds to begin deposit'}
        />
        {status === 'CLOSED' && (
          <Input label="Closed at" disabled value={closedAt || ''} />
        )}
        {!depositDate && balance !== 0 && (
          <Button label="Complete your deposit" onClick={onConfirmDeposit} />
        )}
        <Link to={`/dashboard/transaction?account_number=${accountNumber}`}>
          <Button label="Transaction" />
        </Link>
        {status !== 'CLOSED' && balance === 0 && (
          <Button
            label="Transfer to this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?destination_account_number=${accountNumber}`
              );
            }}
          />
        )}
        {status !== 'CLOSED' && (
          <Button label="Close" secondary onClick={onClosed} />
        )}
      </>
    );
  }
  if (type === 'DEFAULT') {
    details = (
      <>
        <Button
          label="Transfer to this"
          onClick={() => {
            history.push(
              `/dashboard/transfer?destination_account_number=${accountNumber}`
            );
          }}
        />
        {balance !== 0 && (
          <Button
            label="Transfer from this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?source_account_number=${accountNumber}`
              );
            }}
          />
        )}
        <Link to={`/dashboard/transaction?account_number=${accountNumber}`}>
          <Button label="Transaction" />
        </Link>
      </>
    );
  }

  return (
    <div
      className="flex-1 pl-6 pt-6"
      style={{ maxWidth: '400px', minWidth: '275px' }}
    >
      <div className="font-bold text-xl mb-4">Account Details</div>
      <Input label="Account number" disabled value={accountNumber} />
      <Input label="Type" disabled value={type} />
      <Input label="Balance" disabled value={`${balance} ${cU}`} />
      <Input
        label="Created at"
        disabled
        value={formatDatetime(createdAt) || ''}
      />
      <Input
        label="Latest action at"
        disabled
        value={formatDatetime(updatedAt) || ''}
      />
      {details}
    </div>
  );
};
