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

  static async getByCustomerId(id, where, order) {
    const accounts = await Account.findAll({
      where: {
        customer_id: id,
        ...where,
      },
      order: order || [
        ['id', 'DESC'],
      ],
      include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
      }],
    });
    return accounts;
  }

  static async getByAccountId(id, where) {
    const account = await Account.findOne({
      where: {
        id,
        ...where,
      },
      include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
      }],
    });
    return account;
  }

  static async getByAccountNumber(account_number, where) {
    const account = await Account.findOne({
      where: {
        account_number,
        ...where,
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

  static async toggleStatusByCustomer(customerId, accountNumber) {
    try {
      const account = await AccountService.getByAccountNumber(
        accountNumber,
        { customer_id: customerId },
      );
      if (!account) throw new Error('Account not found');
      if (account.type === ACCOUNT_TYPE.DEPOSIT)
        throw new Error('Deposit account can not change status by user');

      const newStatus = {
        [ACCOUNT_STATUS.NORMAL]: ACCOUNT_STATUS.LOCKED,
        [ACCOUNT_STATUS.LOCKED]: ACCOUNT_STATUS.NORMAL,
      };
      return await account.update({
        status: newStatus[account.status],
      });
    } catch (error) {
      console.log('Service Error');
      throw error;
    }
  }

  static async forceChangeStatus(accountNumber, newStatus) {
    try {
      const account = await AccountService.getByAccountNumber(
        accountNumber,
      );
      if (!account) throw new Error('Account not found');
      return await account.update({ status: newStatus });
    } catch (error) {
      console.log('Service Error');
      throw error;
    }
  }
}
export default AccountService;
