import models from '../models';
import AdminTransaction from '../services/transaction.admin';
import TransactionService from '../services/transaction';
import { BANK_ID, BANK_NAME } from '../constants/bank';
import MailService from '../services/mail';
import { receiveProfitEmail } from '../assets/mail-content/receive-profit-email';
import Cron from 'cron';
import moment from 'moment';
import ACCOUNT_TYPE from '../constants/accountType';
import { receiveMoneyEmail } from '../assets/mail-content/transaction';
import { adminChangeAccountStatus } from '../assets/mail-content/admin-change-account-status';
import ACCOUNT_STATUS from '../constants/accountStatus';

const { Account, DepositAccount, DepositType, Customer } = models;

const createProfit = async (account) => {
  try {
    if (account.status !== ACCOUNT_STATUS.NORMAL) {
      return;
    }
    if (moment(new Date(account.depositAccountDetail.deposit_date).getTime()).isAfter(moment())) {
      return;
    }
    const rate = account.depositAccountDetail.DepositType.interest_rate;
    const balance = account.balance;
    const profit = parseInt(balance * rate);

    const transaction = await TransactionService.create({
      source_bank_id: BANK_ID,
      source_bank_name: BANK_NAME,
      destination_bank_id: BANK_ID,
      destination_bank_name: BANK_NAME,
      source_account: account,
      destination_account: account,
      amount: profit,
      note: 'New Profit',
    });

    await AdminTransaction.recharge(transaction);

    const defaultAccount = await Account.findOne({
      where: {
        type: ACCOUNT_TYPE.DEFAULT,
        customer_id: account.customer_id,
      },
      include: [
        {
          model: Customer,
        },
      ],
    });

    const transaction2 = await TransactionService.create({
      source_bank_id: BANK_ID,
      source_bank_name: BANK_NAME,
      destination_bank_id: BANK_ID,
      destination_bank_name: BANK_NAME,
      source_account: account,
      destination_account: defaultAccount,
      amount: account.balance,
      note: 'Close saving account',
    });

    const { destinationAccount } = await TransactionService.execute(transaction2);

    account.status = ACCOUNT_STATUS.CLOSED;
    account.closed_date = new Date();
    await account.save();

    const receiveProfitEmai = receiveProfitEmail(transaction, account.balance);
    await MailService.sendMail(
      account.Customer.email,
      receiveProfitEmai.subject,
      receiveProfitEmai.content,
    );

    const _receiveMoneyEmail = receiveMoneyEmail(transaction2, destinationAccount.balance);
    await MailService.sendMail(
      destinationAccount.Customer.email,
      _receiveMoneyEmail.subject,
      _receiveMoneyEmail.content,
    );

    const closeAccountEmail = adminChangeAccountStatus(destinationAccount.Customer.fullname, {
      account_number: account.account_number,
      oldStatus: ACCOUNT_STATUS.NORMAL,
      newStatus: ACCOUNT_STATUS.CLOSED,
      created_date: new Date(),
    }, null, transaction2.id);

    await MailService.sendMail(
      destinationAccount.Customer.email,
      'PIGGY BANK - Close saving account',
      closeAccountEmail,
    );
  }
  catch (error) {
    console.log(error);
  }
};

const generateProfit = async () => {
  const despositeAccounts = await Account.findAll({
    include: [
      {
        model: DepositAccount,
        as: 'depositAccountDetail',
        required: true,
        include: [
          {
            model: DepositType,
          },
        ],
      },
      {
        model: Customer,
      },
    ],
  });

  await Promise.all(despositeAccounts.map(async account => {
    await createProfit(account);
  }));
};

const job = new Cron.CronJob('00 9 11 * * *', generateProfit);
job.start();
