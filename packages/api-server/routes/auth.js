import express from 'express';

import { register, uploadImage, login, updateIdentity } from '../controllers/auth';
import { customerValidator, identityValidator } from '../validator/auth';
const router = express.Router();
import verifyUser from '../middleware/verifyUser';

router.post('/register', customerValidator, register);
router.post('/login', login);
router.post('/updateIdentity', verifyUser, uploadImage, identityValidator, updateIdentity);

//test protect route
router.get('/test', verifyUser, (req, res) => {
  res.json('Hello World');
});

export default router;
