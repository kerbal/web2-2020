import models from '../models';
import AccountService from './account';
import { TRANSACTION_STATUS } from '../constants/transactionStatus';

const { sequelize, Sequelize } = models;

export default class AdminTransaction {
  static async recharge (transaction) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    try {
      const destination_account = await AccountService.findById(transaction.destination_account_id);
      destination_account.balance += transaction.amount;
      await destination_account.save({ transaction: t });
      transaction.status = TRANSACTION_STATUS.SUCCESS;
      await transaction.save({ transaction: t });
      await t.commit();
    }
    catch (error) {
      await t.rollback();
    }
  }
}
