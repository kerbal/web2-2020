import express from 'express';

import { register, uploadImage, login, forgotPassword, resetPassword } from '../controllers/auth';
import { customerValidator, resetPasswordValidator } from '../validator/auth';
const router = express.Router();
import verifyUser from '../middleware/verifyUser';

router.post('/register', uploadImage, customerValidator, register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPasswordValidator, resetPassword);

//test protect route
router.get('/test', verifyUser, (req, res) => {
  res.json('Hello World');
});

export default router;
