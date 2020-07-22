import AccountService from '../services/account';
import TransactionService from '../services/transaction';
import { BANK_ID, BANK_NAME } from '../constants/bank';
import LogService from '../services/log';
import AdminTransaction from '../services/transaction.admin';

export default class AdminTransactionController {
  static async recharge (req, res, next) {
    try {
      const { account_id } = req.params;
      const { amount, note } = req.body;

      const destination_account = await AccountService.getByAccountId(account_id);
      if (!destination_account) {
        res.status(404).send({ message: `Account id ${account_id} not found` });
      }
      if (amount < 0) {
        res.status(400).send({ message: 'Amount must be larger than 0' });
      }

      const transaction = await TransactionService.create({
        source_bank_id: BANK_ID,
        source_bank_name: BANK_NAME,
        destination_bank_id: BANK_ID,
        destination_bank_name: BANK_NAME,
        source_account: destination_account,
        destination_account,
        amount,
        note,
      });

      await LogService.write({
        admin_id: req.user_id,
        account_id,
        content: 'Recharge money',
        amount,
        note,
      });

      await AdminTransaction.recharge(transaction);
    }
    catch (error) {
      next(error);
    }
  }
}
