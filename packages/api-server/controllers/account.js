import AccountService from '../services/account';
import MailService from '../services/mail';
import LogService from '../services/log';
import { adminChangeAccountStatus as adminChangeAccountStatusContent } from '../assets/mail-content/admin-change-account-status';
import { newAccount as newAccountMailContent } from '../assets/mail-content/new-account';
import { Customer, sequelize, Sequelize } from '../models';
import ACCOUNT_STATUS from '../constants/accountStatus';
import ACCOUNT_TYPE from '../constants/accountType';

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
    const { accountId } = req.params;
    const { page, status } = req.query;

    let data;
    if(accountId) {
      data = await AccountService.findOne({ id: accountId, customer_id });
    } else {
      const where = { customer_id };
      if (status) {
        where.status = status.toUpperCase();
      }
      data = await AccountService.findAll(
        where,
        null,
        20,
        (page - 1) * 20 || 0,
      );
    }
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const customerToggleStatus = async (req, res, next) => {
  try {
    const { id: customerId } = req.auth;
    const { account_id } = req.params;
    const account = await AccountService.toggleStatusByCustomer(
      customerId,
      account_id,
    );
    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

export const adminGet = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const { customerId, page, status } = req.query;
    let data;
    if(accountId) {
      data = await AccountService.findById(accountId);
    } else {
      const where = {};
      if(customerId) {
        where.customer_id = customerId;
      }
      if (status) {
        where.status = status.toUpperCase();
      }
      data = await AccountService.findAll(
        customerId ? where : null,
        null,
        20,
        (page - 1) * 20 || 0,
      );
    }
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const adminChangeStatus = async (req, res, next) => {
  const transaction = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  });
  try {
    const { accountId } = req.params;
    const { status } = req.query;
    const account = await AccountService.findById(accountId);
    const oldStatus = account.status;
    const newStatus = status.toUpperCase();

    if (!ACCOUNT_STATUS[newStatus])
      throw new Error('Invalid status');
    if (!account)
      throw new Error('Account not found');
    if (account.type === ACCOUNT_TYPE.DEFAULT)
      throw new Error('Default account can not be changed');
    if (oldStatus === ACCOUNT_STATUS.CLOSED)
      throw new Error('Closed account can not be changed');

    if(newStatus === ACCOUNT_STATUS.CLOSED) {
      console.log('Create transfer money to default account');
    }

    await account.update({ status: newStatus }, { transaction });
    await transaction.commit();
    const { id: logId } = await LogService.write({
      adminId: req.auth.id,
      action: 'adminChangeStatus',
      account,
      oldStatus,
    });
    MailService.sendMail(
      account.Customer.email,
      'Piggy bank - Account status is changed by admin',
      adminChangeAccountStatusContent(
        account.Customer.fullname,
        {
          account_number: account.account_number,
          oldStatus,
          newStatus,
          created_date: account.created_date,
        },
        logId,
      ),
    );
    return res.status(200).json(account);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
