require('dotenv').config();

import jwt from 'jsonwebtoken';
import { Customer, Identity } from '../models';
import { comparePassword, getHashedPassword } from '../utils/password';
import multer from 'multer';
import MailService from '../services/mail';
import CUSTOMER_STATUS from '../constants/customerStatus';


// SET STORAGE
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public');
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage }).fields([
  { name: 'front_image' },
  { name: 'back_image' },
]);

const uploadImage = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.json({ error: err.message });
    if (!req.files.front_image)
      return res.json({ error : 'Missing front image.' });
    if (!req.files.back_image)
      return res.json({ error : 'Missing back image.' });

    req.body.front_image = req.files.front_image;
    req.body.back_image = req.files.back_image;
    next();
  });
};

const register = async (req, res) => {
  const {
    fullname,
    birthday,
    phone_number,
    password,
    email,
    address,
  } = req.body;

  const hashedPassword = await getHashedPassword(password);
  try {
    const customerExists = await Customer.findOne({
      where: {
        email,
      },
    });
    if (customerExists)
      return res.status(403).json({
        error: 'Email is taken by another account.',
      });

    const newCustomer = await Customer.create({
      fullname,
      birthday,
      phone_number,
      password: hashedPassword,
      email,
      address,
      status: CUSTOMER_STATUS.UNVERIFIED,
    });

    if (newCustomer) {
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(400).json({ error: 'Fail' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Fail' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Customer.findOne({
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
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
    );
    const { id,  fullname, address, status } = user;
    //check user is update identity
    return res.json({
      token,
      user: { id, email, fullname, address, status },
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Something went wrong.',
    });
  }
};
const forgotPassword = async (req, res)=>{
  if (!req.body) return res.status(400).json({ error: 'No request body.' });
  if (!req.body.email) return res.status(400).json({ error: 'Email is required.' });
  const { email } = req.body;
  try {
    const user = await Customer.findOne({
      where: {
        email,
      },
    });
    if (!user){
      return res.status(401).json({ error: 'Email does not exist.' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.
    Please click on the following link, or paste this into your browser to complete the process: 
    ${process.env.HOST}/reset/${token} 
    If you did not request this, please ignore this email and your password will remain unchanged.
    Thanks, 
    The Piggy team`;
    console.log(text);
    await MailService.sendMail(email, 'Piggy bank account password reset ', text);
    user.resetPasswordToken = token;
    await user.save();
    return res.json({ message: 'Success' });
  }
  catch(error){
    return res.status(400).json({
      error: 'Something went wrong.',
    });
  }
};

const resetPassword = async (req, res)=>{
  const { resetPasswordToken, newPassword } = req.body;
  try{
    const user = await Customer.findOne({
      where: {
        resetPasswordToken,
      },
    });
    if (!user) return res.status(400).json({ error:'Invalid link!' });
    const hashedPassword = await getHashedPassword(newPassword);
    user.password = hashedPassword;
    user.resetPasswordToken='';
    await user.save();
    return res.json({ message: 'Success' });
  }
  catch(error){
    return res.status(400).json({
      error:'Something went wrong.',
    });
  }
};
const updateIdentity = async (req, res)=>{
  const {
    pid,
    create_date,
    location,
    customer_id,
  }  = req.body;
  if (req.auth.id != customer_id){
    return res.status(401).json({
      'error': 'Unauthenticated',
    });
  }
  try{
    const user = await Customer.findOne({ where:{ id: customer_id } });
    if (!(user.status == CUSTOMER_STATUS.UNVERIFIED)) return res.json({ error:'Fail.' });
    const newIdentity = await Identity.create({
      customer_id,
      pid,
      create_date,
      location,
      front_image: req.body.front_image[0].filename,
      back_image: req.body.back_image[0].filename,
      status: 'PENDING',
    });
    user.status = CUSTOMER_STATUS.WAITING;
    await user.save();

    if (newIdentity){
      return res.json({ message: 'Success' });
    }
    else {
      return res.status(400).json({ error: 'Fail' });
    }
  }
  catch(error){
    return res.status(400).json({
      error: 'Something went wrong.',
    });
  }
};

const updatePassword = async (req, res)=>{
  const { newPassword } = req.body;
  const { id } = req.auth;
  try{
    const user = await Customer.findOne({
      where: {
        id,
      },
    });
    if (!user) return res.status(400).json({ error:'Invalid!' });
    const hashedPassword = await getHashedPassword(newPassword);
    user.password = hashedPassword;
    user.resetPasswordToken='';
    await user.save();

    const token = jwt.sign(
      { id },
      process.env.JWT_SECRET,
    );

    return res.json({ token, message: 'Success' });
  }
  catch(error){
    return res.status(400).json({
      error:'Something went wrong.',
    });
  }
};

export { register, login, uploadImage, updateIdentity, resetPassword, forgotPassword, updatePassword  };
