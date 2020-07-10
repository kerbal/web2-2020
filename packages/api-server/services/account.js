import { Account, DepositAccount, sequelize, Sequelize } from '../models/index';
import { generateAccountNumber } from '../utils/accountNumber';
import ACCOUNT_TYPE from '../constants/accountType';
import ACCOUNT_STATUS from '../constants/accountStatus';
class AccountService {
  static async getNewAccountNumber(customerId) {
    const latestAccount = await Account.findAll({
      limit: 1,
      order: [[ 'id', 'DESC' ]],
    });
    return generateAccountNumber(customerId, latestAccount.id + 1);
  }
  static async getByCustomerId(id, options = {}) {
    const where = {
      customer_id: id,
      ...options.where,
    };
    const order = options.order ? options.order : [
      ['id', 'DESC'],
    ];
    const accounts = await Account.findAll({
      where, order, include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
      }],
    });
    return accounts;
  }
  static async getByAccountId(id, options) {
    const where = {
      id,
      ...options,
    };
    const account = await Account.findOne({
      where, include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
      }],
    });
    return account;
  }
  static async getByAccountNumber(account_number, options) {
    const where = {
      account_number,
      ...options,
    };
    const account = await Account.findOne({
      where, include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
      }],
    });
    return account;
  }
  static async createDefaultAccount(customerId, currencyUnit) {
    const transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });
    try {
      const account_number = await AccountService.getNewAccountNumber(customerId);
      const account = await Account.create({
        customer_id: customerId,
        type: ACCOUNT_TYPE.DEFAULT,
        account_number,
        balance: 0,
        currency_unit: currencyUnit || 'VND',
        created_date: new Date(),
        closed_date: null,
        status: ACCOUNT_STATUS.NORMAL,
      }, { transaction });
      await transaction.commit();
      return account;
    } catch(error) {
      await transaction.rollback();
      console.log('Service Error');
      throw error;
    }
  }
  static async canTransferMoneyInsideUser(customerId, sourceAccountId, amount) {
    const account = await AccountService.getByAccountId(sourceAccountId);
    if (!account)
      throw new Error('Can not transfer money from source account');
    if (account.customer_id !== customerId)
      throw new Error('Can not transfer money from source account');
    if (account.balance < amount)
      throw new Error('Can not transfer money from source account');
    if (account.status !== ACCOUNT_STATUS.NORMAL)
      throw new Error('Can not transfer money from source account');
    if (
      account.type !== ACCOUNT_TYPE.CHECKING &&
      account.type !== ACCOUNT_TYPE.DEFAULT
    ) throw new Error('Can not transfer money from source account');
    return account;
  }
  static async createNewAccount(accountInfo) {
    const transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });
    const { customer_id, account_type, currency_unit, deposit_account_type_id } = accountInfo;
    try {
      const account_number = await AccountService.getNewAccountNumber(customer_id);
      const account = await Account.create({
        customer_id,
        type: account_type,
        account_number,
        balance: 0,
        currency_unit: currency_unit || 'VND',
        created_date: new Date(),
        closed_date: null,
        status: ACCOUNT_STATUS.NORMAL,
      }, { transaction });
      let depositAccountDetail = null;
      if(account_type === ACCOUNT_TYPE.DEPOSIT) {
        depositAccountDetail = await DepositAccount.create({
          account_id: account.id,
          type_id: deposit_account_type_id,
          deposit_date: new Date(),
        }, { transaction });
      }
      await transaction.commit();
      return {
        ...account.dataValues,
        depositAccountDetail,
      };
    } catch(error) {
      await transaction.rollback();
      console.log('Service Error');
      throw error;
    }
  }
}
export default AccountService;
