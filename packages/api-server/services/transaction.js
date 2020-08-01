/* eslint-disable indent */
import models from '../models';
import AccountService from './account';
import { TRANSACTION_STATUS } from '../constants/transactionStatus';
import { generateOTP } from '../utils/otpGenerator';
import Redis from './redis';
import { Op } from 'sequelize';
import BadRequest from '../utils/error/BadRequest';

const { sequelize, Sequelize, Transaction } = models;

export default class TransactionService {
  static async all({
    account_id,
    page,
  }) {
    const query = {
      attributes: {
        exclude: ['updatedAt', 'error_message', 'otp_id'],
      },
      where: {
        [Op.or]: [
          { destination_account_id: account_id },
          { source_account_id: account_id },
        ],
      },
      limit: 10,
      offset: (page - 1) * 10,
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    const t = await Transaction.findAll(query);
    return t;
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
    source_bank_name,
    destination_bank_name,
    destination_bank_id,
    source_account,
    destination_account,
    amount,
    note,
  }) {
    const transaction = await Transaction.create({
      source_bank_id,
      source_bank_name,
      destination_bank_id,
      destination_bank_name,
      source_account_id: source_account.id,
      source_account_name: source_account.Customer.fullname,
      source_account_number: source_account.account_number,
      destination_account_id: destination_account.id,
      destination_account_name: destination_account.Customer.fullname,
      destination_account_number: destination_account.account_number,
      balance: source_account.balance,
      amount,
      note,
      status: TRANSACTION_STATUS.CREATED,
      errorMessage: '',
      otp_id: null,
    });

    return transaction;
  }

  static async registerOTP (transaction) {
    if (transaction.status !== TRANSACTION_STATUS.CREATED) {
      throw new BadRequest('Invalid OTP registration');
    }
    const token = generateOTP();
    transaction.otp_id = token.id;
    transaction.status = TRANSACTION_STATUS.UNVERIFIED;
    await Redis.setString('otp-' + token.id, token.value, 120);
    await transaction.save();
    return token;
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
      throw new BadRequest('OTP expired');
    }
    else {
      throw new BadRequest('OTP not match');
    }
  }

  static async execute(transaction) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
      switch (transaction.status) {
      case TRANSACTION_STATUS.UNVERIFIED:
        throw new BadRequest('Transaction is unverified');
      case TRANSACTION_STATUS.SUCCESS:
        throw new BadRequest('Transaction has already executed');
      }

      try {
        const sourceAccount = await AccountService.findById(transaction.source_account_id);
        const destinationAccount = await AccountService.findById(transaction.destination_account_id);

        sourceAccount.balance -= transaction.amount;
        destinationAccount.balance += transaction.amount;

        await sourceAccount.save({ transaction: t });
        await destinationAccount.save({ transaction: t });

        transaction.status = TRANSACTION_STATUS.SUCCESS;
        await transaction.save({ transaction: t });
        await t.commit();
        return {
          sourceAccount,
          destinationAccount,
        };
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
