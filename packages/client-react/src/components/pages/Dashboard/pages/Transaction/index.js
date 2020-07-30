import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../../../utils/axios';
import withDashboardFrame from '../../withDashboardFrame';
import { formatCurrency } from '../../../../../utils';

const TransactionPage = () => {
  const accounts = [
    {
      id: 0,
      account_number: '12345',
      balance: 150000,
    },
    {
      id: 1,
      account_number: '67890',
      balance: 225000,
    },
  ];
  const [currentAccountIndex, setCurrentAccountIndex] = useState(1);
  const [account, setAccount] = useState(accounts[currentAccountIndex]);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const token = useSelector(state => state.customerAuth.token);

  const fetchTransaction = async (currentPage = 1) => {
    try {
      const res = await axios.get(
        `/customer/account/${account.id}/transaction?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.transactions.length > 0) {
        setTransactions(transactions.concat(res.data.transactions));
      } else {
        setCanLoadMore(false);
      }
    } catch (error) {
      console.log(error);
      setCanLoadMore(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div className="w-1/2 p-6">
      <h1 className="text-lg font-bold mb-6">Transactions</h1>
      {transactions.map(t => (
        <div className="border shadow-md mb-6 p-3 rounded flex">
          <div className="mr-10 text-lg p-2" style={{ borderRadius: '50%' }}>
            {t.destination_account_id === account.id ? (
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
      ))}

      <div className="flex justify-center">
        {canLoadMore && (
          <button
            type="button"
            className="button bg-blue-500 text-white p-3 rounded mb-4 outline-none"
            onClick={async () => {
              await setPage(page + 1);
              await fetchTransaction(page + 1);
            }}
          >
            Load more transactions
          </button>
        )}
      </div>
    </div>
  );
};

export default withDashboardFrame(TransactionPage);
