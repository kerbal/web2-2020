import express from 'express';

import { register, login } from '../controllers/auth';
import { customerValidator } from '../validator/auth';

const router = express.Router();

router.post('/register', customerValidator, register);
router.post('/login', login);

export default router;
