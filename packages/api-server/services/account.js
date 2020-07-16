import { Account, DepositAccount, sequelize, Sequelize } from '../models/index';
import { generateAccountNumber } from '../utils/accountNumber';
import ACCOUNT_TYPE from '../constants/accountType';
import ACCOUNT_STATUS from '../constants/accountStatus';

class AccountService {
  static async getNewAccountNumber(customerId) {
    const [latestAccount] = await Account.findAll({
      limit: 1,
      order: [[ 'id', 'DESC' ]],
    });
    return generateAccountNumber(customerId, latestAccount.id + 1);
  }

  static async getByCustomerId(id, options = {}) {
    const accounts = await Account.findAll({
      where: {
        customer_id: id,
        ...options.where,
      },
      order: options.order ? options.order : [
        ['id', 'DESC'],
      ],
      include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
      }],
    });
    return accounts;
  }

  static async getByAccountId(id, options) {
    const account = await Account.findOne({
      where: {
        id,
        ...options,
      },
      include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
      }],
    });
    return account;
  }

  static async getByAccountNumber(account_number, options) {
    const account = await Account.findOne({
      where: {
        account_number,
        ...options,
      },
      include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
      }],
    });
    return account;
  }

  static async create(customerId, currencyUnit = 'VND', accountType = ACCOUNT_TYPE.DEFAULT, typeId) {
    const transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });
    try {
      const account_number = await AccountService.getNewAccountNumber(customerId);
      const account = await Account.create({
        customer_id: customerId,
        type: accountType,
        account_number,
        balance: 0,
        currency_unit: currencyUnit,
        created_date: new Date(),
        closed_date: null,
        status: ACCOUNT_STATUS.NORMAL,
        depositAccountDetail: accountType === ACCOUNT_TYPE.DEPOSIT ? {
          type_id: typeId,
        } : null,
      }, {
        include: [{
          model: DepositAccount,
          as: 'depositAccountDetail',
        }],
        transaction,
      });
      await transaction.commit();
      return account;
    } catch(error) {
      await transaction.rollback();
      console.log('Service Error');
      throw error;
    }
  }

  static async changeStatus(account, newStatus) {
    const transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });
    try {
      account.status = newStatus;
      await transaction.commit();
      return account;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async changeStatusByUser({ customerId, accountNumber, newStatus }) {
    try {
      const account = await AccountService.getByAccountNumber(
        accountNumber,
        { customer_id: customerId },
      );
      if (!account) throw new Error('Account not found');
      if (account.type === ACCOUNT_TYPE.DEPOSIT)
        throw new Error('Deposit account can not change status by user');
      if (
        account.status === ACCOUNT_STATUS.CLOSED ||
        account.status === newStatus
      ) {
        throw new Error(`Account status is ${account.status}`);
      }
      return await AccountService.changeStatus(account, newStatus);
    } catch (error) {
      console.log('Service Error');
      throw error;
    }
  }

  static async changeStatusByAdmin({ accountNumber, newStatus }) {
    try {
      const account = await AccountService.getByAccountNumber(
        accountNumber,
      );
      if (!account) throw new Error('Account not found');
      if (
        account.status === ACCOUNT_STATUS.CLOSED ||
        account.status === newStatus
      ) {
        throw new Error(`Account status is ${account.status}`);
      }
      account.status = newStatus;
      return await AccountService.changeStatus(account, newStatus);
    } catch (error) {
      console.log('Service Error');
      throw error;
    }
  }
}
export default AccountService;
