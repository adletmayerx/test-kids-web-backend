export default class NotAuthError extends Error {
  statusCode: number;
  name: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.name = "NotAuthError";
  }
}
