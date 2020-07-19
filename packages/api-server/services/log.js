import models from '../models';

const { Log } = models;

export default class LogService {
  static async write (data) {
    try {
      await Log.create({
        data,
      });
      return true;
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
