import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../../common/Button';
import Input from '../../../../common/Input';
import { formatDatetime } from '../../../../../utils';

export default ({ account, onChangeStatus }) => {
  const { status, type, accountNumber, balance } = account;
  const history = useHistory();
  let details = null;
  if (type === 'CHECKING') {
    details = (
      <>
        <Button
          label={status === 'NORMAL' ? 'Lock' : 'Unlock'}
          onClick={onChangeStatus}
        />
        {status === 'NORMAL' ? (
          <Button
            label="Transfer to this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?account_number=${accountNumber}&src=false`
              );
            }}
          />
        ) : null}
        {status === 'NORMAL' ? (
          <Button
            label="Transfer from this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?account_number=${accountNumber}&src=true`
              );
            }}
          />
        ) : null}
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
          value={
            depositDate
              ? formatDatetime(depositDate)
              : 'Add funds to begin deposit'
          }
        />
        {balance !== 0 ? (
          <Button
            label="Complete your deposit"
            onClick={() => {
              console.log('complete');
            }}
          />
        ) : (
          <Button
            label="Transfer to this"
            onClick={() => {
              history.push(
                `/dashboard/transfer?account_number=${accountNumber}&src=false`
              );
            }}
          />
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
        <Button
          label="Transfer from this"
          onClick={() => {
            history.push(
              `/dashboard/transfer?account_number=${accountNumber}&src=true`
            );
          }}
        />
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
