import express from 'express';

import { login } from '../controllers/auth.admin';
import verifyAdmin from '../middleware/verifyUser';

const router = express.Router();

router.post('/login', login);

//test admin route
router.get('/test', verifyAdmin, (req, res) => {
  res.json({
    message: 'Success',
  });
});

export default router;
