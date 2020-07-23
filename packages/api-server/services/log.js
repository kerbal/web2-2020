import models from '../models';

const { Log } = models;

export default class LogService {
  static async write (data) {
    try {
      return await Log.create({
        data,
      });
    }
    catch (error) {
      return false;
    }
  }

  static async read (option) {
    // draft
    const logs = await Log.findAll(option);
    return logs;
  }
}
