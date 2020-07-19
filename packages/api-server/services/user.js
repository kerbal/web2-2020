import { Customer } from '../models';
import { Sequelize } from '../models/';

class UserService {
  static async getAllUser(limit=10, page=1) {
    const offset = (page - 1) * limit;
    const users = await Customer.findAll({
      offset,
      limit,
      attributes: ['id', 'fullname',  'email', 'birthday', 'phone_number', 'address'],
    });
    if (!users) return [];
    return users;
  }
  static async getById(id){
    try{
      const user = await Customer.findOne({
        where:{
          id,
        },
        attributes: ['id', 'fullname',  'email', 'birthday', 'phone_number', 'address'],
      });
      if (!user) return {};
      return user;
    }
    catch(error){
      return {};
    }

  }
  static async search(pattern, limit=10, page=1){
    const offset = (page - 1) * limit;
    try{
      const users = await Customer.findAll({
        attributes: ['id', 'fullname', 'email', 'birthday', 'phone_number', 'address'],
        where:{
          [Sequelize.Op.or]:[
            {
              email:{
                [Sequelize.Op.iLike]: `%${pattern}%`,
              },
            },
            {
              fullname:{
                [Sequelize.Op.iLike]: `%${pattern}%`,
              },
            },
          ],
        },
        offset,
        limit,
      });
      if (!users) return [];
      return users;
    }
    catch(error){
      return [];
    }
  }
}

export default UserService;
