import jwt from 'jsonwebtoken';

import { comparePassword } from '../utils/password';
import { Admin } from '../models';
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        error: 'Email does not exist',
      });
    }
    const isTruePassword = await comparePassword(password, user.password);
    if (!isTruePassword) {
      return res.status(401).json({
        error: 'Email and password do not match.',
      });
    }
    const token = jwt.sign({ id: user.id, role: 'admin' }, process.env.JWT_SECRET);
    const { id, name } = user;
    return res.json({
      token,
      user: { id, email, name },
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Something went wrong.',
    });
  }
};

export { login };
