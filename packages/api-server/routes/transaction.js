import express from 'express';
import verifyUser from '../middleware/verifyUser';
const app = express.Router();

app.get('/')