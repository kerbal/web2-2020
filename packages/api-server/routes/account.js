import express from 'express';
const router = express.Router();
import verifyCustomer from '../middleware/verifyUser';
import verifyAdmin from '../middleware/verifyAdmin';
import * as AccountController from '../controllers/account';
import {
  customerCreateValidator,
} from '../validator/account';
import { UserTransactionController } from '../controllers/transaction';

//route for customer /customer
router.get('/customer/account',
  verifyCustomer,
  AccountController.customerGetAll);

router.get('/customer/account/:accountId',
  verifyCustomer,
  AccountController.customerGetOne);

router.post('/customer/account',
  verifyCustomer,
  customerCreateValidator,
  AccountController.customerCreate);

router.put('/customer/account/:account_id/status',
  verifyCustomer,
  AccountController.customerToggleStatus);

router.put('/customer/account/:account_id/closed',
  verifyCustomer,
  AccountController.customerCloseAccount);

router.put('/customer/account/:account_id/confirm-deposit',
  verifyCustomer,
  AccountController.customerConfirmDeposit);

router.get('/customer/account/:account_id/transaction',
  verifyCustomer,
  UserTransactionController.getAll);

router.get('/customer/account/:account_id/transaction/:transaction_id',
  verifyCustomer,
  UserTransactionController.getOne);

router.get('/admin/account',
  verifyCustomer,
  verifyAdmin,
  AccountController.adminGetAll);

router.get('/admin/account/:accountId',
  verifyCustomer,
  verifyAdmin,
  AccountController.adminGetOne);

router.put('/admin/account/:accountId/status',
  verifyCustomer,
  verifyAdmin,
  AccountController.adminChangeStatus);

router.get('/admin/account/:account_id/transaction',
  verifyCustomer,
  verifyAdmin,
  UserTransactionController.getAll);

router.get('/admin/account/:account_id/transaction/:transaction_id',
  verifyCustomer,
  verifyAdmin,
  UserTransactionController.getOne);

export default router;
