import AccountService from '../services/account';
import MailService from '../services/mail';
import LogService from '../services/log';
import TransactionService from '../services/transaction';
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

export const customerGetAll = async (req, res, next) => {
  try {
    const { id: customer_id } = req.auth;
    const { page, status, all, account_number } = req.query;
    const where = { customer_id };
    if (status) {
      where.status = status.toUpperCase();
    }
    if(account_number) {
      where.account_number = account_number;
    }
    const accounts = await AccountService.findAll(
      where,
      null,
      all === 'true' ? null : 20,
      all === 'true' ? null : ((page - 1) * 20 || 0),
    );
    return res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};

export const customerGetOne = async (req, res, next) => {
  try {
    const { id: customer_id } = req.auth;
    const { accountId } = req.params;
    const account =  await AccountService.findOne({ id: accountId, customer_id });
    return res.status(200).json(account);
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

export const customerConfirmDeposit = async (req, res, next) => {
  try {
    const { id: customerId } = req.auth;
    const { account_id } = req.params;
    const account = await AccountService.customerConfirmDeposit(
      customerId,
      account_id,
    );
    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

export const customerCloseAccount = async (req, res, next) => {
  const t = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  });
  try {
    const { id: customerId } = req.auth;
    const { account_id } = req.params;
    const account = await AccountService.findOne({
      id: account_id,
      customer_id: customerId,
    });

    if (!account)
      throw new Error('Account not found');
    if(account.type === ACCOUNT_TYPE.DEFAULT)
      throw new Error('Account is DEFAULT');

    if(account.balance === 0) {
      await account.update({ status: ACCOUNT_STATUS.CLOSED }, { t });
      await t.commit();
      return res.status(200).json(account);
    }

    const defaultAccount = await AccountService.findOne({
      customer_id: customerId,
      type: ACCOUNT_TYPE.DEFAULT,
    });

    if (!defaultAccount)
      throw new Error('Default account not found');

    if (account.depositAccountDetail && account.depositAccountDetail.deposit_date)
      throw new Error('Account is deposited');

    const oldStatus = account.status;
    const bank_id = 'PIGGY';
    const transaction = (await TransactionService.create({
      source_bank_id: bank_id,
      destination_bank_id: bank_id,
      source_account_id: account.id,
      destination_account_id: defaultAccount.id,
      amount: account.balance,
      note: `Admin ${req.auth.id} closed ${account.id}`,
    })).transaction;
    await TransactionService.execute(transaction);

    await account.update({ status: ACCOUNT_STATUS.CLOSED }, { t });
    await t.commit();

    MailService.sendMail(
      account.Customer.email,
      'Piggy bank - Your account status has been closed',
      adminChangeAccountStatusContent(
        account.Customer.fullname,
        {
          account_number: account.account_number,
          oldStatus,
          newStatus: ACCOUNT_STATUS.CLOSED,
          created_date: account.updatedAt,
        },
        null,
        transaction ? transaction.id : null,
      ),
    );
    return res.status(200).json(account);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

export const adminGetAll = async (req, res, next) => {
  try {
    const { customerId, page, status, account_number } = req.query;
    const where = {};
    if(customerId) {
      where.customer_id = customerId;
    }
    if (status) {
      where.status = status.toUpperCase();
    }
    if (account_number) {
      where.account_number = account_number;
    }
    const accounts = await AccountService.findAll(
      where,
      null,
      20,
      (page - 1) * 20 || 0,
    );
    return res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};

export const adminGetOne = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const account = await AccountService.findById(accountId);
    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

export const adminChangeStatus = async (req, res, next) => {
  const t = await sequelize.transaction({
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  });
  try {
    const { accountId } = req.params;
    const { status } = req.query;
    const account = await AccountService.findById(accountId);
    const oldStatus = account.status;
    const newStatus = status.toUpperCase();
    const customer = account.Customer;
    let transaction;

    if (!ACCOUNT_STATUS[newStatus])
      throw new Error('Invalid status');
    if (oldStatus === newStatus)
      throw new Error('Invalid status');
    if (!account)
      throw new Error('Account not found');
    if (account.type === ACCOUNT_TYPE.DEFAULT)
      throw new Error('Default account can not be changed');
    if (oldStatus === ACCOUNT_STATUS.CLOSED)
      throw new Error('Closed account can not be changed');

    if(newStatus === ACCOUNT_STATUS.CLOSED) {
      const bank_id = 'PIGGY';
      const defaultAccount = await AccountService.findOne({
        customer_id: customer.id,
        type: ACCOUNT_TYPE.DEFAULT,
      });
      transaction = (await TransactionService.create({
        source_bank_id: bank_id,
        destination_bank_id: bank_id,
        source_account_id: account.id,
        destination_account_id: defaultAccount.id,
        amount: account.balance,
        note: `Admin ${req.auth.id} closed ${account.id}`,
      })).transaction;
      await TransactionService.execute(transaction);
      await account.update({ closed_date: new Date() }, { t });
    }

    await account.update({ status: newStatus }, { t });
    await t.commit();
    const { id: logId, createAt } = await LogService.write({
      adminId: req.auth.id,
      action: 'adminChangeStatus',
      accountId: account.id,
      newStatus,
      oldStatus,
      transactionId: transaction ? transaction.id : null,
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
          created_date: createAt,
        },
        logId,
        transaction ? transaction.id : null,
      ),
    );
    return res.status(200).json(account);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
