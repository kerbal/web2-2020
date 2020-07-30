import express from 'express';

import { register, uploadImage, login, forgotPassword, resetPassword, updateIdentity } from '../controllers/auth';
import { customerValidator, resetPasswordValidator, identityValidator } from '../validator/auth';
import verifyUser from '../middleware/verifyUser';

const router = express.Router();


router.post('/register', customerValidator, register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPasswordValidator, resetPassword);
router.post('/updateIdentity', verifyUser, uploadImage, identityValidator, updateIdentity);

//test protect route
router.get('/test', verifyUser, (req, res) => {
  res.json('Hello World');
});

export default router;
