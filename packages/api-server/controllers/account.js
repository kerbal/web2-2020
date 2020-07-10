import AccountService from '../services/account';
import ACCOUNT_TYPE from '../constants/accountType';
export const createAccountByUser = async (req, res) => {
  const { id: customer_id } = req.auth;
  try {
    const {
      accountType,
      currencyUnit,
      depositAccountTypeId,
      amount,
      sourceAccountId,
    } = req.body;
    //const checkBalance = await AccountService.canTransferMoneyInsideUser(customer_id, sourceAccountId, amount);
    if (
      !accountType || (
        accountType !== ACCOUNT_TYPE.CHECKING &&
        accountType !== ACCOUNT_TYPE.DEPOSIT
      )
    ) throw new Error('Not valid account type');
    if (
      accountType === ACCOUNT_TYPE.DEPOSIT &&
      !depositAccountTypeId
    ) throw new Error('No deposit account info');

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
export const getAccountByUser = async (req, res) => {
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
