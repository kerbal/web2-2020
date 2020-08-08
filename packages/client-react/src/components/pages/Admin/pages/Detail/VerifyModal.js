import React, { useState } from 'react';
import PromptModal from '../../../../common/PromptModal';
import VerifyContainer from '../Verify/VerifyContainer';

const VerifyModal = ({ enabled, onDismiss, accountData }) => {
  const onSubmitVerification = () => {
    console.log('verified!');
  };

  return (
    <PromptModal
      enabled={enabled}
      onDismiss={() => {
        onDismiss();
      }}
      modalName="topup-modal"
      title="Verify customer"
      content={<VerifyContainer accountData={accountData} />}
      onAccept={() => {
        onSubmitVerification();
      }}
    />
  );
};

export default VerifyModal;
