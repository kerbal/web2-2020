import express from 'express';
const router = express.Router();
import verifyCustomer from '../middleware/verifyUser';
import * as AccountController from '../controllers/account';
import { userCreate, userLock, userUnlock } from '../validator/account';
//route for customer /customer
router.get('/customer/account', verifyCustomer,
  AccountController.userGet);

router.post('/customer/account-new', verifyCustomer,
  userCreate,
  AccountController.userCreate);

router.put('/customer/account-lock', verifyCustomer,
  userLock,
  AccountController.userChangeAccountStatus);

router.put('/customer/account-unlock', verifyCustomer,
  userUnlock,
  AccountController.userChangeAccountStatus);
//route for admin /admin

export default router;
