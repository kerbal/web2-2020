import models from '../models';
import BankService from './bank';
import AccountService from './account';
import { TRANSACTION_STATUS } from '../constants/transactionStatus';
import { generateOTP } from '../utils/otpGenerator';
import Redis from './redis';

const { sequelize, Sequelize, Transaction } = models;

export default class TransactionService {
  static async create({
    bank_id,
    source_account_id,
    destination_account_id,
    amount,
    note,
  }) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
      const bank_name = BankService.getBankInfo(bank_id);
      if (!bank_name) {
        throw new Error('Bank not found');
      }
      const sourceAccount = await AccountService.getByAccountId(source_account_id);
      if (!sourceAccount) {
        throw new Error(`Source account id ${source_account_id}`);
      }
      const destinationAccount = await AccountService.getByAccountId(destination_account_id);
      if (!destinationAccount) {
        throw new Error(`Destination account id ${source_account_id}`);
      }
      const remaining_balance = sourceAccount.remaining_balance;
      if (amount > remaining_balance) {
        throw new Error('Remaining balance is not enough');
      }

      const transaction = await Transaction.create({
        bank_id,
        bank_name,
        source_account_id,
        destination_account_id,
        remaining_balance,
        amount,
        note,
        status: TRANSACTION_STATUS.CREATED,
        errorMessage: '',
        otp_id: null,
      });

      await t.commit();

      return transaction.id;
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
    const generated_otp = await Redis.getString(transaction.otp_id);
    if (generated_otp === otp) {
      transaction.status = TRANSACTION_STATUS.VERIFIED;
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
      if (transaction.status !== TRANSACTION_STATUS.VERIFIED) {
        throw new Error('Transaction is unverified');
      }

      try {
        const sourceAccount = await AccountService.getByAccountId(transaction.source_account_id);
        const destinationAccount = await AccountService.getByAccountId(transaction.destination_account_id);

        sourceAccount.remaining_balance -= transaction.amount;
        destinationAccount.remaining_balance += transaction.amount;

        sourceAccount.save({ transaction: t });
        destinationAccount.save({ transaction: t });

        transaction.status = TRANSACTION_STATUS.SUCCESS;
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
