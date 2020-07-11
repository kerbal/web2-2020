import AccountService from '../services/account';

export const userCreate = async (req, res, next) => {
  try {
    const { id: customer_id } = req.auth;
    const {
      accountType,
      currencyUnit,
      depositAccountTypeId,
      amount,
      sourceAccountNumber,
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
      sourceAccountNumber,
    };
    console.log(transactionInfo);
    // Create transaction
    //  blah blah
    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
export const userGet = async (req, res, next) => {
  try {
    const { id: customerId } = req.auth;
    const accounts = await AccountService.getByCustomerId(customerId);
    return res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};
export const userChangeAccountStatus = async (req, res, next) => {
  try {
    const { id: customerId } = req.auth;
    const { accountNumber } = req.body;
    const { newStatus } = res.locals;
    const account = await AccountService.userChangeAccountStatus({
      customerId,
      accountNumber,
      newStatus,
    });
    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};