import AccountService from '../services/account';
import MailService from '../services/mail';
import { Customer } from '../models';

export const userCreate = async (req, res, next) => {
  try {
    const { id: customer_id } = req.auth;
    const {
      accountType,
      currencyUnit,
      depositAccountTypeId,
    } = req.body;

    const account = await AccountService.create(customer_id, currencyUnit, accountType, depositAccountTypeId);
    const customer = await Customer.findOne({
      where: {
        id: customer_id,
      },
    });
    MailService.sendMailNewAccount(customer, account);
    return res.status(200).json(account);
  } catch (error) {
    console.log(error.message);
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
    const account = await AccountService.changeStatusByUser({
      customerId,
      accountNumber,
      newStatus,
    });
    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
