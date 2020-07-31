import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../../common/Button';
import Input from '../../../../common/Input';
import { formatDatetime } from '../../../../../utils';

export default ({ account, onChangeStatus, onClosed }) => {
  const { status, type, accountNumber, balance, closedAt } = account;
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
          <Input label="Closed at" disabled value={closedAt || ''} />
        )}
        {status === 'NORMAL' && (
          <Button
            label="Transfer to this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?account_number=${accountNumber}&src=false`
              );
            }}
          />
        )}
        {status === 'NORMAL' && balance !== 0 && (
          <Button
            label="Transfer from this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?account_number=${accountNumber}&src=true`
              );
            }}
          />
        )}
        {status !== 'CLOSED' && (
          <Button label="Closed" secondary onClick={onClosed} />
        )}
      </>
    );
  }
  if (type === 'DEPOSIT') {
    const {
      deposit_date: depositDate,
      depositType: { expiry_time: expiryTime, interest_rate: interestRate },
    } = account?.depositAccountDetail;
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
        {balance !== 0 && (
          <Button
            label="Complete your deposit"
            onClick={() => {
              console.log('complete');
            }}
          />
        )}
        {status === 'CLOSED' && (
          <Input label="Closed at" disabled value={closedAt || ''} />
        )}
        {status !== 'CLOSED' && balance === 0 && (
          <Button
            label="Transfer to this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?account_number=${accountNumber}&src=false`
              );
            }}
          />
        )}
        {!depositDate && status !== 'CLOSED' && (
          <Button label="Closed" secondary onClick={onClosed} />
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
              `/dashboard/transfer?account_number=${accountNumber}&src=false`
            );
          }}
        />
        {balance !== 0 && (
          <Button
            label="Transfer from this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?account_number=${accountNumber}&src=true`
              );
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="flex-1 pl-6 pt-6" style={{ maxWidth: '275px' }}>
      <div className="font-bold text-xl mb-4">Account Details</div>
      {details}
    </div>
  );
};
