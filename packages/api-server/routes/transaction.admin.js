import express from 'express';
import AdminTransactionController from '../controllers/transaction.admin';
import { UserTransactionController } from '../controllers/transaction';
const router = express.Router();

router.post('/', AdminTransactionController.recharge);
router.get('/account_id', UserTransactionController.getAll);
