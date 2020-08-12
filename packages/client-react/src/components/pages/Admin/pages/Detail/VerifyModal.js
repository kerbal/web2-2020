import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PromptModal from '../../../../common/PromptModal';
import VerifyContainer from '../Verify/VerifyContainer';
import { verifyCustomer } from '../../api/adminCustomer';

const VerifyModal = ({ enabled, onDismiss, customerId }) => {
  const token = useSelector(state => state.adminAuth.token);

  const onSubmitVerification = async () => {
    const result = await verifyCustomer(customerId, token);
    onDismiss();
    window.location.reload();
  };

  return (
    <PromptModal
      enabled={enabled}
      onDismiss={() => {
        onDismiss();
      }}
      modalName="topup-modal"
      title="Verify customer"
      content={<VerifyContainer customerId={customerId} />}
      onAccept={() => {
        onSubmitVerification();
      }}
    />
  );
};

export default VerifyModal;
