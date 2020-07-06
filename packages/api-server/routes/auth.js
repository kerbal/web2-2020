import express from 'express';

import {
  register,
  uploadImage,
  login,
} from '../controllers/auth';
import { customerValidator } from '../validator/auth';
const router = express.Router();
import verifyUser from '../middleware/verifyUser';

router.post('/register', uploadImage, customerValidator, register);
router.post('/login', login);

//test protect route
router.get('/test', verifyUser, (req, res)=>{
  res.json('Hello World');
});

export default router;
