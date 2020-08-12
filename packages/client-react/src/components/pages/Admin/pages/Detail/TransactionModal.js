import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PromptModal from '../../../../common/PromptModal';
import TransactionsView from '../../components/TransactionsView';
import Loading from '../../../../common/Loading';
import { getTransactionsByAccountId } from '../../api/adminCustomer';

// const getTransactionsByAccountId = () => {
//   const data = `{"transactions":[{"id":40,"bank_id":null,"bank_name":null,"source_bank_id":"PIGGY","source_bank_name":null,"destination_bank_id":"PIGGY","destination_bank_name":null,"source_account_id":54,"source_account_name":"Test customer 2","source_account_number":"2000947447130054","destination_account_id":48,"destination_account_name":"Test customer 2","destination_account_number":"2000651275980048","balance":500,"amount":5,"note":"","status":"UNVERIFIED","createdAt":"2020-08-05T09:06:54.212Z"},{"id":38,"bank_id":null,"bank_name":null,"source_bank_id":"PIGGY","source_bank_name":null,"destination_bank_id":"PIGGY","destination_bank_name":null,"source_account_id":54,"source_account_name":"Test customer 2","source_account_number":"2000947447130054","destination_account_id":1,"destination_account_name":"Test customer 1","destination_account_number":"1111111111111111","balance":1000,"amount":500,"note":"","status":"SUCCESS","createdAt":"2020-08-05T07:34:11.005Z"},{"id":37,"bank_id":null,"bank_name":null,"source_bank_id":"PIGGY","source_bank_name":null,"destination_bank_id":"PIGGY","destination_bank_name":null,"source_account_id":2,"source_account_name":"Test customer 2","source_account_number":"2222222222222222","destination_account_id":54,"destination_account_name":"Test customer 2","destination_account_number":"2000947447130054","balance":2000000,"amount":1000,"note":"asd","status":"SUCCESS","createdAt":"2020-08-01T09:16:52.683Z"}]}`;
//   return { data: JSON.parse(data) };
// };

const ModalContent = ({ accountId, accountNumber, transactionsList, loading }) => {
  return (
    <div>
      <span>{`List of transactions for account id: ${accountNumber}`}</span>
      <TransactionsView
        transactionsList={transactionsList}
        accountId={accountId}
        loading={loading}
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
  const [loading, setLoading] = useState(true);
  const onSubmitLock = () => {
    console.log('locked!');
  };

  const token = useSelector(state => state.adminAuth.token);
  const getTransactions = async () => {
    const accountId = selectedAccountToViewTrans.id;
    const result = await getTransactionsByAccountId(accountId, token);
    if (result && result.data && result.data.transactions) {
      setTransactionsList(result.data.transactions);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  console.log(selectedAccountToViewTrans);
  return (
    <>
      <PromptModal
        enabled={enabled}
        disableOkButton
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
            loading={loading}
          />
        )}
        onAccept={() => {
          onSubmitLock();
        }}
      />
      {loading && <Loading />}
    </>
  );
};

export default TransactionModal;
