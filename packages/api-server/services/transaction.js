import models from '../models';
import BankService from './bank';
import AccountService from './account';
import { TRANSACTION_STATUS } from '../constants/transactionStatus';
import { generateOTP } from '../utils/otpGenerator';
import Redis from './redis';
import { Op } from 'sequelize';

const { sequelize, Sequelize, Transaction } = models;

export default class TransactionService {
  static async all({
    account_id,
    page,
  }) {
    const query = {
      attributes: [
        'source_bank_name',
        'destination_bank_name',
        'source_account_name',
        'destination_bank_name',
        'amount',
        'note',
        'status',
        'error_message',
      ],
      where: {
        [Op.or]: [
          { destination_account_id: account_id },
          { destination_account_id: account_id },
        ],
      },
      limit: 20,
      offset: (page - 1) * 20,
    };
    const t = await Transaction.findAll(query);
    return t.rows;
  }

  static async one({
    transaction_id,
  }) {
    const query = {
      where: {
        id: transaction_id,
      },
    };
    const t = await Transaction.findOne(query);
    return t;
  }

  static async create({
    source_bank_id,
    destination_bank_id,
    source_account_id,
    destination_account_id,
    amount,
    note,
  }) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
      const source_bank_name = (await BankService.getBankInfo(source_bank_id)).name;
      if (!source_bank_name) {
        throw new Error('Bank not found');
      }
      const destination_bank_name = await (await BankService.getBankInfo(destination_bank_id)).name;
      if (!destination_bank_name) {
        throw new Error('Bank not found');
      }
      const sourceAccount = await AccountService.getByAccountId(source_account_id);
      if (!sourceAccount) {
        throw new Error(`Source account id ${source_account_id} not found`);
      }
      const destinationAccount = await AccountService.getByAccountId(destination_account_id);
      if (!destinationAccount) {
        throw new Error(`Destination account id ${source_account_id} not found`);
      }
      const remaining_balance = sourceAccount.balance;
      if (amount > remaining_balance) {
        throw new Error('Remaining balance is not enough');
      }
      const transaction = await Transaction.create({
        source_bank_id,
        source_bank_name,
        destination_bank_id,
        destination_bank_name,
        source_account_id,
        source_account_name: sourceAccount.Customer.fullname,
        destination_account_id,
        destination_account_name: destinationAccount.Customer.fullname,
        balance: remaining_balance,
        amount,
        note,
        status: TRANSACTION_STATUS.CREATED,
        errorMessage: '',
        otp_id: null,
      });

      await t.commit();

      return transaction;
    }
    catch (err) {
      await t.rollback;
      throw err;
    }
  }

  static async registerOTP (transaction) {
    const token = generateOTP();
    transaction.otp_id = token.id;
    transaction.status = TRANSACTION_STATUS.UNVERIFIED;
    await Redis.setString('otp-' + token.id, token.value, 120);
    await transaction.save();
  }

  static async verifyOTP(transaction, otp) {
    const key = 'otp-' + transaction.otp_id;
    const generated_otp = await Redis.getString(key);
    if (generated_otp === otp) {
      transaction.status = TRANSACTION_STATUS.VERIFIED;
      await transaction.save();
      await Redis.removeString(key);
    }
    else if (generated_otp === null) {
      throw new Error('OTP expired');
    }
    else {
      throw new Error('OTP not match');
    }
  }

  static async execute(transaction) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
      switch (transaction.status) {
        case TRANSACTION_STATUS.UNVERIFIED:
          throw new Error('Transaction is unverified');
        case TRANSACTION_STATUS.SUCCESS:
          throw new Error('Transaction has already executed');
      }

      try {
        const sourceAccount = await AccountService.getByAccountId(transaction.source_account_id);
        const destinationAccount = await AccountService.getByAccountId(transaction.destination_account_id);

        sourceAccount.balance -= transaction.amount;
        destinationAccount.balance += transaction.amount;

        await sourceAccount.save({ transaction: t });
        await destinationAccount.save({ transaction: t });

        transaction.status = TRANSACTION_STATUS.SUCCESS;
        await transaction.save({ transaction: t });
        await t.commit();
      }
      catch (error) {
        transaction.status = TRANSACTION_STATUS.ERROR;
        transaction.error_message = error.message;
        await transaction.save();
        throw error;
      }
    }
    catch (error) {
      await t.rollback();
    }
  }
}
