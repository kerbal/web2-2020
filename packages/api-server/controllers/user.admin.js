import { Customer, Account } from '../models';
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
          as: 'account',
        },
      ],
    });
    if (!data) return res.json([]);
    res.json(data);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getIdentityImage = (req, res) => {
  const { name } = req.params;
  const filepath = `./public/${name}`;
  try {
    res.contentType('image/jpeg');
    // 1. Read your image as base 64
    fs.readFile(filepath, function (err, content) {
      if (err) {
        res.writeHead(400, { 'Content-type': 'text/html' });
        console.log(err);
        res.end('No such image');
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200, { 'Content-type': 'image/jpg' });
        res.end(content);
      }
    });
  } catch (error) {
    res.status('400').json({ error: 'Something went wrong.' });
  }
};
