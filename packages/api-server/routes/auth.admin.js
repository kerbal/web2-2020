import express from 'express';

import { login, verifyCustomerAccount } from '../controllers/auth.admin';
import requireSignIn from '../middleware/verifyUser';
import isAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.post('/login', login);
router.post('/verifyCusomer', requireSignIn, isAdmin, verifyCustomerAccount);

//test admin route
router.get('/test', requireSignIn, isAdmin, (req, res) => {
  res.json({
    message: 'Success',
  });
});

export default router;
