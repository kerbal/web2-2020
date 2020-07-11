import express from 'express';
const router = express.Router();
import verifyCustomer from '../middleware/verifyUser';
import * as AccountController from '../controllers/account';
import {
  customerCreateValidator,
  customerLockValidator,
  customerUnlockValidator,
} from '../validator/account';
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
//route for admin /admin

export default router;
