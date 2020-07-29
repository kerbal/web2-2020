import AccountService from '../services/account';
import TransactionService from '../services/transaction';
import { BANK_ID, BANK_NAME } from '../constants/bank';
import LogService from '../services/log';
import AdminTransaction from '../services/transaction.admin';
import MailService from '../services/mail';
import { receiveMoneyEmail } from '../assets/mail-content/transaction';
import NotFound from '../utils/error/NotFound';
import BadRequest from '../utils/error/BadRequest';

export default class AdminTransactionController {
  static async recharge (req, res, next) {
    try {
      const { account_id, amount, note } = req.body;

      const destination_account = await AccountService.findById(account_id);
      if (!destination_account) {
        throw new NotFound(`Account id ${account_id} not found`);
      }
      if (amount < 0) {
        throw new BadRequest('Amount must be larger than 0');
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

      const emailContent = receiveMoneyEmail(transaction, destination_account.balance + amount);
      await MailService.sendMail(
        destination_account.Customer.email,
        emailContent.subject,
        emailContent.content,
      );

      res.status(200).send({
        message: 'successful',
      });
    }
    catch (error) {
      next(error);
    }
  }
}
