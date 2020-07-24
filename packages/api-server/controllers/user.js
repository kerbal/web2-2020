import UserService from '../services/user';

const getAllUser = async (req, res) => {
  try{
    const { limit, page } = req.query;
    const users = await UserService.getAllUser(limit, page);
    res.json(users);
  }
  catch(error){
    return res.status(400).json({
      error:'Something went wrong.',
    });
  }
};

const searchUser = async (req, res) => {
  try{
    const { limit, page, pattern } = req.query;
    const user = await UserService.search(pattern, limit, page);
    res.json(user);
  }
  catch(error){
    return res.status(400).json({
      error:'Something went wrong.',
    });
  }
};

const getById = async (req, res)=>{
  try{
    const { id } = req.params;
    const user = await UserService.getById(id);
    res.json(user);
  }
  catch(error){
    return res.status(400).json({
      error:'Something went wrong.',
    });
  }
};
export { getAllUser, searchUser, getById };
