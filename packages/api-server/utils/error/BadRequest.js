export default class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'BadRequest';
    this.message = message;
  }
}
