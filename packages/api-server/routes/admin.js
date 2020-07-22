import express from 'express';

import { getAllUser, searchUser, getById } from '../controllers/user';

const router = express.Router();

router.get('/customer/all', getAllUser);
router.get('/customer/search', searchUser);
router.get('/customer/:id', getById);


router.get('/test', (req, res) => {
  res.json(req[req.auth.role]);
});
export default router;
