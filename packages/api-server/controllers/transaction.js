import TransactionService from '../services/transaction';

export class UserTransactionController {
  static async create (req, res, next) {
    try {
      const transaction = await TransactionService.create(req.body);
      await TransactionService.registerOTP(transaction);
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
      await TransactionService.execute(transaction);
      res.send({
        message: 'success',
      });
    }
    catch (error) {
      next(error);
    }
  }
}
