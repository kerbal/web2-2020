import TransactionService from '../services/transaction';
import MailService from '../services/mail';

export class UserTransactionController {
  static async create (req, res, next) {
    try {
      const { transaction, sourceAccount } = await TransactionService.create(req.body);
      const otp = await TransactionService.registerOTP(transaction);
      try {
        await MailService.sendMail(
          sourceAccount.Customer.email,
          'Money transfer confirmation',
          [
            '## Transaction Confirmation',
            'Your are performing a money transfer.',
            '',
            '**Source account**',
            `- Account number: ${sourceAccount.account_number}`,
            `- Remaining balance: ${sourceAccount.balance}`,
            '',
            '**Destination account**',
            `- Bank name: ${transaction.destination_bank_name}`,
            `- Account number: ${transaction.destination_account_number}`,
            `- Account name: ${transaction.destination_account_name}`,
            '',
            `**Amount**: ${transaction.amount}`,
            '',
            `**Your OTP**: ${otp.value}`,
            '',
            'Use the code above to confirm the transaction. **This code will be expired in 2 minutes.**',
            '',
            '----------',
            '**PIGGY BANK**',
          ].join('\n'),
        );
      }
      catch (error) {
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
