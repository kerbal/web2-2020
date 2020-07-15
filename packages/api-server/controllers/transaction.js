import TransactionService from '../services/transaction';
import MailService from '../services/mail';
import { transactionconfirmation } from '../assets/mail-content/transaction-confirmation';
import { spendMoneyEmail, receiveMoneyEmail } from '../assets/mail-content/transaction';

export class UserTransactionController {
  static async create (req, res, next) {
    try {
      const { transaction, sourceAccount } = await TransactionService.create(req.body);
      const otp = await TransactionService.registerOTP(transaction);
      try {
        await MailService.sendMail(
          sourceAccount.Customer.email,
          'Money transfer confirmation',
          transactionconfirmation(transaction, sourceAccount, otp),
        );
      }
      catch (err) {
        //
      }
      res.send({
        transaction_id: transaction.id,
      });
    }
    catch (error) {
      next(error);
    }
  }

  static async execute (req, res, next) {
    try {
      const { otp } = req.body;
      const { transaction_id } = req.params;
      const transaction = await TransactionService.one({ transaction_id: parseInt(transaction_id) });
      await TransactionService.verifyOTP(transaction, otp);
      const { sourceAccount, destinationAccount } = await TransactionService.execute(transaction);

      try {
        const spendEmail = spendMoneyEmail(transaction, sourceAccount.balance);
        await MailService.sendMail(
          sourceAccount.Customer.email,
          spendEmail.subject,
          spendEmail.content,
        );
        const receiveEmail = receiveMoneyEmail(transaction, destinationAccount.balance);
        await MailService.sendMail(
          destinationAccount.Customer.email,
          receiveEmail.subject,
          receiveEmail.content,
        );
      }
      catch (err) {
        //
      }

      res.send({
        message: 'success',
      });
    }
    catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { page } = req.query;
      const { account_id } = req.params;
      const transactions = await TransactionService.all({ account_id, page });
      res.send({
        transactions,
      });
    }
    catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { page } = req.query;
      const { account_id } = req.params;
      const transactions = await TransactionService.all({ account_id, page });
      res.send({
        transactions,
      });
    }
    catch (error) {
      next(error);
    }
  }
}
