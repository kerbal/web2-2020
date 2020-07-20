import redis from 'redis';

const redisClient = redis.createClient({
  url: process.env.NODE_ENV === 'production' ? process.env.REDIS_URL : 'redis://localhost:6379',
});

export default class Redis {
  static ping () {
    return new Promise((resolve, reject) => {
      redisClient.ping((err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }

  static setString (key, value, second) {
    return new Promise((resolve, reject) => {
      redisClient.set(key, value, async (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          if (second) {
            await this.setExpire(key, second);
          }
          resolve(result);
        }
      });
    });
  }

  static getString (key) {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }

  static removeString (key) {
    return new Promise((resolve, reject) => {
      redisClient.del(key, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }

  static setExpire (key, second) {
    return new Promise((resolve, reject) => {
      redisClient.expire(key, second, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });
  }
}
