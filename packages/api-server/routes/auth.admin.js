import express from 'express';

import { login, verifyCustomerAccount, unverifyCustomerAccount } from '../controllers/auth.admin';
import requireSignIn from '../middleware/verifyUser';
import isAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.post('/login', login);
router.post('/verifyCusomer', requireSignIn, isAdmin, verifyCustomerAccount);
router.post('/unverifyCusomer', requireSignIn, isAdmin, unverifyCustomerAccount);
//test admin route
router.get('/test', requireSignIn, isAdmin, (req, res) => {
  res.json({
    message: 'Success',
  });
});

export default router;
