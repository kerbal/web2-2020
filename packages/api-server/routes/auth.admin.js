import express from 'express';

import { login } from '../controllers/auth.admin';
<<<<<<< HEAD
import verifyAdmin from '../middleware/verifyUser';
=======
import requireSignIn from '../middleware/verifyUser';
import isAdmin from '../middleware/verifyAdmin';
>>>>>>> bc999791dfba9f58dcd24d5d4e13f8f1c70e3676

const router = express.Router();

router.post('/login', login);

//test admin route
<<<<<<< HEAD
router.get('/test', verifyAdmin, (req, res) => {
=======
router.get('/test', requireSignIn, isAdmin, (req, res) => {
>>>>>>> bc999791dfba9f58dcd24d5d4e13f8f1c70e3676
  res.json({
    message: 'Success',
  });
});

export default router;
