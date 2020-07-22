import express from 'express';

import * as AccountController from '../controllers/account';
import { UserTransactionController } from '../controllers/transaction';
import { uploadImage, forgotPassword, resetPassword, updateIdentity } from '../controllers/auth';

import { resetPasswordValidator, identityValidator } from '../validator/auth';
import { customerCreateValidator, customerToggleStatusValidator } from '../validator/account';


const router = express.Router();

router.post('/password', forgotPassword);
router.put('/password', resetPasswordValidator, resetPassword);

router.post('/identity', uploadImage, identityValidator, updateIdentity);

router.get('/transaction', UserTransactionController.getAll);
router.get('/transaction/:transaction_id', UserTransactionController.getOne);
router.post('/transaction', UserTransactionController.create);
router.put('/transaction/:transaction_id', UserTransactionController.execute);

router.get('/account', AccountController.customerGet);
router.post('/account', customerCreateValidator, AccountController.customerCreate);
router.put('/account/status', customerToggleStatusValidator, AccountController.customerToggleStatus);
router.get('/account/:account_id/transactions', UserTransactionController.getAll);

router.get('/test', (req, res) => {
  res.json(req[req.auth.role]);
});
export default router;
