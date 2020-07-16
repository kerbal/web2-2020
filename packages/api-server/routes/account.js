import express from 'express';
const router = express.Router();
import verifyCustomer from '../middleware/verifyUser';
import * as AccountController from '../controllers/account';
import {
  customerCreateValidator,
  customerToggleStatusValidator,
} from '../validator/account';

//route for customer /customer
router.get('/customer/account', verifyCustomer,
  AccountController.customerGet);

router.post('/customer/account-new', verifyCustomer,
  customerCreateValidator,
  AccountController.customerCreate);

router.put('/customer/account-toggle-status', verifyCustomer,
  customerToggleStatusValidator,
  AccountController.customerToggleStatus);

//route for admin /admin

export default router;
