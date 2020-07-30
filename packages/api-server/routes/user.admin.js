import express from 'express';

import { getAllAccount, getIdentityImage } from '../controllers/user.admin';
import requireSignIn from '../middleware/verifyUser';
import isAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/:id', requireSignIn, isAdmin, getAllAccount);
router.get('/pid/:name', requireSignIn, isAdmin, getIdentityImage);

export default router;
