import express from 'express';
const router = express.Router();
import verifyUser from '../middleware/verifyUser';
import * as AccountController from '../controllers/account';
import { userCreateAccountValidator } from '../validator/account';

router.post('/', verifyUser, userCreateAccountValidator,  AccountController.userCreateAccount);
router.get('/', verifyUser, AccountController.userGetAccount);
router.post('/test', verifyUser, (req, res) => {
  res.json('Hello World');
});

export default router;
