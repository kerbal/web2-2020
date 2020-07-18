import { Customer } from '../models';
import { Sequelize } from '../models/';

class UserService {
  static async getAllUser(limit, page) {
    const offset = (page - 1) * limit;
    const users = await Customer.findAll({
      offset,
      limit,
    });
    return users;
  }
  static async search(pattern){
    try{
      const users = await Customer.findAll({
        attributes: ['fullname', 'id', 'email'],
        where:{
          [Sequelize.Op.or]:[
            {
              email:{
                [Sequelize.Op.like]: `%${pattern}%`,
              },
            },
            {
              fullname:{
                [Sequelize.Op.like]: `%${pattern}%`,
              },
            },
          ],
        },
      });
      return users;
    }
    catch(error){
      return [];
    }
  }
}

export default UserService;
