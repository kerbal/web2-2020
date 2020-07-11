require('dotenv').config();

import jwt from 'jsonwebtoken';
import { Customer, Identity } from '../models';
import { comparePassword, getHashedPassword } from '../utils/password';
import multer from 'multer';

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
      status:'UNVERIFIED',
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
        error: 'User with that email does not exist.',
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
    const { id, name, status } = user;
    let message;
    //check user is update identity
    const identity = await Identity.findOne({
      where:{
        customer_id:id,
      },
    });
    if (!identity){
      message='Update your identity.';
    } else if (status==='UNVERIFIED'){
      message='Unverified';
    }
    return res.json({
      token,
      user: { id, email, name },
      message,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Something went wrong.',
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
    const newIdentity = await Identity.create({
      customer_id,
      pid,
      create_date,
      location,
      front_image: req.body.front_image[0].filename,
      back_image: req.body.front_image[0].filename,
      status: 'PENDING',
    });
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
export { register, login, uploadImage, updateIdentity };
