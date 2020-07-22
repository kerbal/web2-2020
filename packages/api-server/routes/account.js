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
router.get(['/customer/account', '/customer/account/:accountId'],
  verifyCustomer,
  AccountController.customerGet);

router.post('/customer/account',
  verifyCustomer,
  customerCreateValidator,
  AccountController.customerCreate);

router.put('/customer/account/:account_id/status',
  verifyCustomer,
  AccountController.customerToggleStatus);

router.get('/customer/account/:account_id/transactions',
  verifyCustomer,
  UserTransactionController.getAll);

router.get(['/admin/account', '/admin/account/:accountId'],
  verifyCustomer,
  verifyAdmin,
  AccountController.adminGet);

router.put('/admin/account/:accountId/status',
  verifyCustomer,
  verifyAdmin,
  AccountController.adminChangeStatus);

export default router;
