import AccountService from '../services/account';
import MailService from '../services/mail';
import { newAccount as newAccountMailContent } from '../assets/mail-content/new-account';
import { Customer } from '../models';

export const customerCreate = async (req, res, next) => {
  try {
    const { id: customer_id } = req.auth;
    const {
      accountType,
      currencyUnit,
      depositAccountTypeId,
    } = req.body;

    const account = await AccountService.create(customer_id, currencyUnit, accountType, depositAccountTypeId);
    const customer = await Customer.findByPk(customer_id);
    MailService.sendMail(
      customer.email,
      `Piggy bank - New ${account.type} account created`,
      newAccountMailContent(customer, account),
    );
    return res.status(200).json(account);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
export const customerGet = async (req, res, next) => {
  try {
    const { id: customer_id } = req.auth;
    const { id } = req.params;
    let data;
    if(id) {
      data = await AccountService.findById(id, { customer_id });
    } else {
      data = await AccountService.findAll({ customer_id });
    }
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const customerToggleStatus = async (req, res, next) => {
  try {
    const { id: customerId } = req.auth;
    const { accountId } = req.body;
    const account = await AccountService.toggleStatusByCustomer(
      customerId,
      accountId,
    );
    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
