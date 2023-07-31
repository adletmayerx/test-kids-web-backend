export default class ValidationError extends Error {
  statusCode: number;
  name: string;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}
