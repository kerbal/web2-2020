import { Account, DepositType, DepositAccount, sequelize, Sequelize, Customer } from '../models/index';
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

  static async findAll(where, order, limit, offset) {
    const accounts = await Account.findAll({
      where,
      order: order || [
        ['id', 'DESC'],
      ],
      include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
        include: [{
          model: DepositType,
          as: 'depositType',
        }],
        required: false,
      }, {
        model: Customer,
        attributes: ['email', 'fullname', 'phone_number', 'id'],
      }],
      limit,
      offset,
    });
    return accounts;
  }

  static async findById(id, where) {
    const account = await Account.findByPk(id, {
      where,
      include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
        include: [{
          model: DepositType,
          as: 'depositType',
        }],
      }, {
        model: Customer,
      }],
    });
    return account;
  }

  static async findOne(where) {
    const account = await Account.findOne({
      where,
      include: [{
        model: DepositAccount,
        as: 'depositAccountDetail',
        include: [{
          model: DepositType,
          as: 'depositType',
        }],
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
          include: [{
            model: DepositType,
            as: 'depositType',
          }],
        }],
        transaction,
      });

      account.depositAccountDetail.depositType = await account.depositAccountDetail.getDepositType()
      account.depositAccountDetail.save()
      await transaction.commit();
      return account;
    } catch(error) {
      await transaction.rollback();
      console.log('Service Error');
      throw error;
    }
  }

  static async customerConfirmDeposit(customer_id, accountId) {
    try {
      const account = await AccountService.findOne({
        id: accountId,
        customer_id,
        type: ACCOUNT_TYPE.DEPOSIT,
      });
      if (!account) throw new Error('Account not found');
      if (account.balance === 0) throw new Error('Account balance is 0');
      if (account.depositAccountDetail.deposit_date) throw new Error('Account already deposited');
      await account.depositAccountDetail.update({
        deposit_date: new Date(),
      });
      return account;
    } catch (error) {
      console.log('Service Error');
      throw error;
    }
  }

  static async toggleStatusByCustomer(customer_id, accountId) {
    try {
      const account = await AccountService.findOne({
        id: accountId,
        customer_id,
      });
      if (!account) throw new Error('Account not found');
      if (account.type === ACCOUNT_TYPE.DEPOSIT)
        throw new Error('Deposit account can not be locked');
      if (account.type === ACCOUNT_TYPE.DEFAULT)
        throw new Error('Default account can not be locked');

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
}
export default AccountService;
