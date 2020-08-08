import React, { useState } from 'react';
import PromptModal from '../../../../common/PromptModal';

const LockModal = ({ enabled, onDismiss, accountData }) => {
  const onSubmitLock = () => {
    console.log('locked!');
  };

  return (
    <PromptModal
      enabled={enabled}
      onDismiss={() => {
        onDismiss();
      }}
      modalName="topup-modal"
      title="Lock customer"
      content={<div>Are you sure locking this customer? </div>}
      onAccept={() => {
        onSubmitLock();
      }}
    />
  );
};

export default LockModal;