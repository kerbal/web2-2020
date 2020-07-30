import { Customer, Account } from '../models';

export const getAllAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Customer.findOne({
      where: {
        id,
      },
      attributes: [ 'id', 'fullname', 'birthday', 'status', 'phone_number' ],
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
