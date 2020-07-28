import TransactionService from '../services/transaction';
import MailService from '../services/mail';
import { transactionconfirmation } from '../assets/mail-content/transaction-confirmation';
import { spendMoneyEmail, receiveMoneyEmail } from '../assets/mail-content/transaction';
import BankService from '../services/bank';
import AccountService from '../services/account';
import NotFound from '../utils/error/NotFound';

export class UserTransactionController {
  static async create (req, res, next) {
    try {
      const {
        source_bank_id,
        destination_bank_id,
        source_account_id,
        destination_account_id,
        amount,
      } = req.body;

      const source_bank_name = (await BankService.getBankInfo(source_bank_id)).name;
      if (!source_bank_name) {
        throw new NotFound('Source bank not found');
      }
      const destination_bank_name = (await BankService.getBankInfo(destination_bank_id)).name;
      if (!destination_bank_name) {
        throw new NotFound('Destination bank not found');
      }
      const source_account = await AccountService.findById(source_account_id);
      if (!source_account) {
        throw new NotFound(`Source account id ${source_account_id} not found`);
      }
      const destination_account = await AccountService.findById(destination_account_id);
      if (!destination_account) {
        throw new NotFound(`Destination account id ${source_account_id} not found`);
      }
      const remaining_balance = source_account.balance;
      if (amount > remaining_balance) {
        throw new NotFound('Remaining balance is not enough');
      }

      const transaction = await TransactionService.create({
        ...req.body,
        source_account,
        destination_account,
      });
      const otp = await TransactionService.registerOTP(transaction);
      await MailService.sendMail(
        source_account.Customer.email,
        'Money transfer confirmation',
        transactionconfirmation(transaction, source_account, otp),
      );
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
      const { transaction_id } = req.params;
      const transaction = await TransactionService.one(({ transaction_id, page }));
      res.send({
        transaction,
      });
    }
    catch (error) {
      next(error);
    }
  }

  static async registerOTP(req, res, next) {
    try {
      const { transaction_id } = req.params;
      const transaction = await TransactionService.one({ transaction_id });
      const source_account = await AccountService.findById(transaction.source_account_id);
      const otp = await TransactionService.registerOTP(transaction);
      await MailService.sendMail(
        source_account.Customer.email,
        'Money transfer confirmation',
        transactionconfirmation(transaction, source_account, otp),
      );
      res.send({
        message: 'success',
      });
    }
    catch (error) {
      next(error);
    }
  }
}
