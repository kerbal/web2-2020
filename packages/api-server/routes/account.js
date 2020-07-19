import express from 'express';
const router = express.Router();
import verifyCustomer from '../middleware/verifyUser';
import * as AccountController from '../controllers/account';
import {
  customerCreateValidator,
  customerLockValidator,
  customerUnlockValidator,
} from '../validator/account';
import { UserTransactionController } from '../controllers/transaction';

//route for customer /customer
router.get('/customer/account', verifyCustomer,
  AccountController.userGet);

router.post('/customer/account-new', verifyCustomer,
  customerCreateValidator,
  AccountController.userCreate);

router.put('/customer/account-lock', verifyCustomer,
  customerLockValidator,
  AccountController.userChangeAccountStatus);

router.put('/customer/account-unlock', verifyCustomer,
  customerUnlockValidator,
  AccountController.userChangeAccountStatus);

router.get('/customer/account/:account_id/transactions', verifyCustomer, UserTransactionController.getAll);
//route for admin /admin

export default router;
