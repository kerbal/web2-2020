import express from 'express';
import adminRoute from './admin';
import customerRoute from './customer';
import customerAuth from './auth';
import adminAuth from './auth.admin';

import verifyUser from '../middleware/verifyUser';
const router = express.Router();

router.use('/customer/auth', customerAuth);
router.use('/admin/auth', adminAuth);
router.use('/api/admin', verifyUser, adminRoute);
router.use('/api/customer', verifyUser, customerRoute);

export default router;
