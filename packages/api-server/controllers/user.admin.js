import { Customer, Account, Identity } from '../models';
import fs from 'fs';

export const getAllAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Customer.findOne({
      where: {
        id,
      },
      attributes: ['id', 'fullname', 'birthday', 'status', 'phone_number'],
      include: [
        {
          model: Account,
          foreignKey: 'customer_id',
        },
      ],
    });
    if (!data) return res.json([]);
    res.json(data);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getIdentityImage = async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;
  if (type != 'front_image' && type != 'back_image')
    return res.json({
      error: 'No image',
    });
  try {
    const identity = await Identity.findOne({
      where: { customer_id: userId },
      attributes: [type],
    });
    if (!identity)
      return res.json({
        error: 'No image',
      });
    const name = identity[type];
    const filepath = `./public/${name}`;
    // 1. Read your image as base 64
    fs.readFile(filepath, function (err, content) {
      if (err) {
        res.writeHead(400, { 'Content-type': 'text/html' });
        console.log(err);
        res.end('No such image');
      } else {
        //specify the content type in the response will be an image
        const img = content.toString('base64');
        res.end(img);
      }
    });
  } catch (error) {
    res.status('400').json({ error: 'Something went wrong.' });
  }
};
