export default class ForbiddenError extends Error {
  statusCode: number;
  name: string;

  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}
