import express from 'express';
const router = express.Router();
import { UserTransactionController } from '../controllers/transaction';

router.get('/', UserTransactionController.getAll);
router.get('/:transaction_id', UserTransactionController.getOne);
router.post('/', UserTransactionController.create);
router.post('/:transaction_id', UserTransactionController.execute);

export default router;
