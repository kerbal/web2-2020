import React, { useState } from 'react';
import PromptModal from '../../../../common/PromptModal';
import TransactionsView from '../../components/TransactionsView';

const ModalContent = ({ accountId, accountNumber, transactionsList }) => {
  return (
    <div>
      <span>{`List of transactions for account id: ${accountNumber}`}</span>
      <TransactionsView
        transactionsList={transactionsList}
        accountId={accountId}
      />
    </div>
  );
};

const TransactionModal = ({
  enabled,
  onDismiss,
  selectedAccountToViewTrans,
}) => {
  const [transactionsList, setTransactionsList] = useState([]);
  const onSubmitLock = () => {
    console.log('locked!');
  };
  console.log(selectedAccountToViewTrans);
  return (
    <PromptModal
      enabled={enabled}
      onDismiss={() => {
        onDismiss();
      }}
      modalName="topup-modal"
      title="Transactions"
      content={(
        <ModalContent
          accountId={selectedAccountToViewTrans.id}
          accountNumber={selectedAccountToViewTrans.accountNumber}
          transactionsList={transactionsList}
        />
      )}
      onAccept={() => {
        onSubmitLock();
      }}
    />
  );
};

export default TransactionModal;
