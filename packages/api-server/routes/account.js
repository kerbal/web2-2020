import express from 'express';
const router = express.Router();
import verifyUser from '../middleware/verifyUser';
import * as accountController from '../controllers/account';

router.post('/', verifyUser, accountController.createAccountByUser);
router.get('/', verifyUser, accountController.getAccountByUser);
router.post('/test', verifyUser, (req, res) => {
  res.json('Hello World');
});

export default router;
