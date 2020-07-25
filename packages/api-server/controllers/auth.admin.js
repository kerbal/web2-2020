import jwt from 'jsonwebtoken';
import { comparePassword } from '../utils/password';
import { Admin, Customer } from '../models';
import CUSTOMER_STATUS from '../constants/customerStatus';
import AccountService from '../services/account';
import LogService from '../services/log';
import MailService from '../services/mail';
import { newAccount as newAccountMailContent } from '../assets/mail-content/new-account';

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
    const token = jwt.sign({ id: user.id, admin:true }, process.env.JWT_SECRET);
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

const verifyCustomerAccount = async (req, res)=>{
  const { customer_id } = req.body;
  if (!customer_id){
    return res.status(400).json({
      message:'customer_id is required.',
    });
  }
  try {
    const user = await Customer.findOne({
      where:{
        id: customer_id,
      },
    });

    if (user){
      user.status = CUSTOMER_STATUS.VERIFIED;
      await user.save();
      const account = await AccountService.create(customer_id, 'VND', 'DEFAULT', 0);
      await LogService.write({
        adminId: req.auth.id,
        action: `Admin verify customer:${user.fullname}`,
        customerId: customer_id,
      });
      await LogService.write({
        adminId: req.auth.id,
        action: `Create DEFAULT ACCOUNT  for ${user.fullname}`,
        customerId: customer_id,
        accountId: account.id,
      });
      await MailService.sendMail(
        user.email,
        `Piggy bank - New ${account.type} account created`,
        newAccountMailContent(user, account),
      );

      res.json({
        message: 'Success',
      });
    }
    else {
      res.json({
        message: 'Fail',
      });
    }
  }
  catch(error){
    return res.status(400).json({
      error: 'Something went wrong.',
    });
  }
};
export { login, verifyCustomerAccount };
