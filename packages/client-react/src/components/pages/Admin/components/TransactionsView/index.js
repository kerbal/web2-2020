import React from 'react';
import { formatCurrency } from '../../../../../utils';

const TransactionItem = ({ t, accountId }) => {
  return (
    <div key={t.id} className="border shadow-md mb-6 p-3 rounded flex">
      <div className="mr-10 text-lg p-2" style={{ borderRadius: '50%' }}>
        {t.destination_account_id === accountId ? (
          <span className="text-green-400 font-semibold">+</span>
        ) : (
          <span className="text-red-400 font-semibold">-</span>
        )}
      </div>
      <div>
        <p>
          <strong>Amount:&nbsp;</strong>
          {formatCurrency(t.amount)}
        </p>
        <p className="font-semibold">Source account</p>
        <ul className="list-disc ml-5 mb-3">
          <li>
            Bank ID:&nbsp;
            {t.source_bank_id}
          </li>
          <li>
            Number:&nbsp;
            {t.source_account_number}
          </li>
          <li>
            Name:&nbsp;
            {t.source_account_name}
          </li>
        </ul>
        <p className="font-semibold">Destination account</p>
        <ul className="list-disc ml-5 mb-3">
          <li>
            Bank ID:&nbsp;
            {t.destination_bank_id}
          </li>
          <li>
            Number:&nbsp;
            {t.destination_account_number}
          </li>
          <li>
            Name:&nbsp;
            {t.destination_account_name}
          </li>
        </ul>
        <p
          className={`font-semibold ${
            t.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {t.status}
        </p>
      </div>
    </div>
  );
};

const TransactionsView = ({ accountId, transactionsList, loading }) => {
  return transactionsList && transactionsList.length > 0 && !loading ? (
    <div
      className="mt-6 overflow-y-scroll"
      style={{ height: '500px', width: '600px' }}
    >
      {transactionsList.map(t => (
        <TransactionItem t={t} accountId={accountId} />
      ))}
    </div>
  ) : (
    <p className="mt-6">This account hasn't made any transactions.</p>
  );
};

export default TransactionsView;
