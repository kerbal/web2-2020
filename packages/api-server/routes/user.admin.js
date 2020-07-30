import express from 'express';

import { getAllAccount } from '../controllers/user.admin';
import requireSignIn from '../middleware/verifyUser';
import isAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/:id', requireSignIn, isAdmin, getAllAccount);

export default router;
