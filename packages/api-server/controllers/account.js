import AccountService from '../services/account';
export const userCreateAccount = async (req, res) => {
  const { id: customer_id } = req.auth;
  try {
    const {
      accountType,
      currencyUnit,
      depositAccountTypeId,
      amount,
      sourceAccountId,
    } = req.body;
    //const sourceAccount = await AccountService.canTransferMoneyInsideUser(customer_id, sourceAccountId, amount);
    const account = await AccountService.createNewAccount({
      customer_id,
      account_type: accountType,
      currency_unit: currencyUnit,
      deposit_account_type_id: depositAccountTypeId,
    });
    const transactionInfo = {
      amount,
      sourceAccountId,
    };
    console.log(transactionInfo);
    // Create transaction
    //  blah blah
    return res.json(account);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      customer_id,
      error: error.message,
    });
  }
};
export const userGetAccount = async (req, res) => {
  try {
    const { id: customerId } = req.auth;
    const accounts = await AccountService.getByCustomerId(customerId);
    return res.json(accounts);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: 'Something went wrong.',
    });
  }
};
