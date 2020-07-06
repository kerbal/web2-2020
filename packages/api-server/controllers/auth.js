require('dotenv').config();

import jwt from 'jsonwebtoken';
import { Customer, Identity } from '../models';
import { comparePassword, getHashedPassword } from '../utils/password';
import multer from 'multer';

// SET STORAGE
var storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'public');
  },
  filename (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage }).fields([{ name: 'front_image' }, { name: 'back_image' }]);

const uploadImage = async (req, res, next)=>{
  upload(req, res, err=>{
    if (err) return res.json({ message: err.message });
    if (!req.files.front_image) return res.json({ message: 'Please upload front image' });
    if (!req.files.back_image) return res.json({ message: 'Please upload back image' });

    req.body.front_image = req.files.front_image;
    req.body.back_image = req.files.back_image;
    next();
  });
};


const register = async(req, res)=>{
  let { fullname, birthday, phone_number, password, email, address,
    pid, create_date, location } = req.body;

  password = await getHashedPassword(password);
  try{
    const customerExists =await Customer.findOne({
      where:{
        email,
      },
    });
    if (customerExists) return res.status(403).json({
      error: 'Email is taken by another account.',
    });

    const newCustomer = await Customer.create({
      fullname, birthday, phone_number, password, email, address,
    });
    await Identity.create({
      customer_id: newCustomer.id,
      pid, create_date, location,
      front_image:req.body.front_image[0].filename,
      back_image:req.body.front_image[0].filename,
      status:'Pending',
    });

    if (newCustomer){
      res.status(200).json({ message:'Signup success!! Please login' });
    }
    else
    {
      res.status(400).json({ error:'Signup fail!!' });
    }
  }
  catch(err){
    return res.status(400).json({
      error:'Signup fail!!',
    });
  }
};

const login = async (req, res)=>{
  console.log('run');
  const { email, password } = req.body;
  let user;
  try{
    user = await Customer.findOne({
      where:{
        email,
      },
    });
    if (!user){
      return res.status(401).json({
        error:'User with that email isn\'t exits. Please signin again.',
      });
    }

    const isTruePassword = await comparePassword(password, user.password);
    if (!isTruePassword){
      return res.status(401).json({
        error:'Email and password do not match.',
      });
    }
  }
  catch(error){
    return res.status(400).json({
      error:'Something went wrong.',
    });
  }

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  const { id, name } = user;
  return res.json({
    token,
    user:{ id, email, name },
  });
};

export {
  register,
  login,
  uploadImage,
};
