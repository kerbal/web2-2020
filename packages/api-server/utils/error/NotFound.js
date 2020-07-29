export default class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'NotFound';
    this.message = message;
  }
}
