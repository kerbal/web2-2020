import React, { useState } from 'react';
import TopupComponent from './TopupComponent';
import { icons } from '../../../../../assets';

const TopupContainer = props => {
  const {
    accountData,
    selectedAccount,
    setSelectedAccount,
    topupState,
    amount,
    setAmount,
  } = props;
  console.log(topupState);
  if (topupState === 'done') return <TopupDoneContainer />;
  if (topupState === 'fail') return <TopupFailContainer />;
  return (
    <TopupComponent
      accountData={accountData}
      selectedAccount={selectedAccount}
      setSelectedAccount={setSelectedAccount}
      loading={topupState === 'loading'}
      amount={amount}
      setAmount={setAmount}
    />
  );
};

const TopupDoneContainer = props => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img alt="" width={50} height="auto" src={icons.done_tick} />
      <span className="pt-3">Topup Done.</span>
    </div>
  );
};

const TopupFailContainer = props => {
  return <div>Topup Failed.</div>;
};

export default TopupContainer;
