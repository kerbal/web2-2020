import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import axios from '../../../../../utils/axios';
import withDashboardFrame from '../../withDashboardFrame';
import { formatCurrency } from '../../../../../utils';
import ComboBox from '../../../../common/ComboBox';
import Loading from '../../../../common/Loading';

const TransactionPage = ({ accounts }) => {
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const token = useSelector(state => state.customerAuth.token);
  const [loading, setLoading] = useState(false);

  const fetchTransaction = async (currentPage = 1, reload = false) => {
    setLoading(true);
    const account = accounts[currentAccountIndex];
    if (account) {
      try {
        const res = await axios.get(
          `/customer/account/${account.id}/transaction?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (reload) {
          setTransactions(res.data.transactions);
        } else {
          setTransactions(transactions.concat(res.data.transactions));
        }
        if (res.data.transactions.length < 10) {
          setCanLoadMore(false);
        }
      } catch (error) {
        console.log(error);
        setCanLoadMore(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accountNumber = urlParams.get('account_number');
    if (accounts && accountNumber) {
      const index = accounts.findIndex(
        acc => acc.account_number === accountNumber
      );
      setCurrentAccountIndex(index === -1 ? 0 : index);
    }
  }, [accounts]);

  useEffect(() => {
    const changeAccount = async () => {
      setPage(1);
      setCanLoadMore(true);
      fetchTransaction(1, true);
    };
    changeAccount();
  }, [currentAccountIndex, accounts]);

  const onLoadMore = async () => {
    await setPage(page + 1);
    await fetchTransaction(page + 1);
  };

  return (
    <div className="w-1/2 p-6">
      <h1 className="pb-4 font-bold text-4xl">Your Transactions</h1>
      <ComboBox
        label="Choose account number"
        onValueChange={accountIndex => {
          setCurrentAccountIndex(accountIndex);
        }}
        value={currentAccountIndex || 0}
      >
        {accounts &&
          accounts.map((acc, index) => (
            <option value={index} key={acc.account_number}>
              {acc.account_number}
            </option>
          ))}
      </ComboBox>
      {transactions.map(t => (
        <div key={t.id} className="border shadow-md mb-6 p-3 rounded flex">
          <div className="mr-10 text-lg p-2" style={{ borderRadius: '50%' }}>
            {t.destination_account_id === accounts[currentAccountIndex].id ? (
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
        {loading && <Loading />}
        {canLoadMore && (
          <button
            type="button"
            className="button bg-blue-500 text-white p-3 rounded mb-4 outline-none"
            onClick={onLoadMore}
          >
            Load more transactions
          </button>
        )}
      </div>
    </div>
  );
};

export default withDashboardFrame(
  connect(state => ({
    accounts: state.customerAccounts.accounts,
  }))(TransactionPage)
);
