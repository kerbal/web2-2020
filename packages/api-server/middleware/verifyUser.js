require('dotenv').config();
import expressJwt from 'express-jwt';
import { Admin, Customer } from '../models';
import customError from '../utils/customError';

const roles = {
  customer: Customer.findByPk.bind(Customer),
  admin: Admin.findByPk.bind(Admin),
};
const verifyUser =  [
  expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256'],
  }),
  async (req, res, next) => {
    try {
      const { id, role } = req.auth;
      if(!roles[role]) {
        throw customError('UnauthorizedError', 'Unauthorized');
      }
      const user = await roles[role](id);
      if(!user) {
        throw customError('UnauthorizedError', 'Can not authorize');
      }
      req[role] = user;
      next();
    } catch(error) {
      next(error);
    }
  },
];

export default verifyUser;
