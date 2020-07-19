import express from 'express';

import { getAllUser, searchUser, getById } from '../controllers/user';

const router = express.Router();

router.get('/all', getAllUser);
router.get('/search', searchUser);
router.get('/:id', getById);

export default router;
